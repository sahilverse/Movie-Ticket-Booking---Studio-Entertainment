"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail, getUserById } from "@/lib/utils";
import { passwordSchema, userDetailsSchema, emailSchema, otpSchema, resetPasswordSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { hashPassword, verifyPassword } from "@/lib/password";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";


// Update User Details
export const updateUserDetails = async (data: z.infer<typeof userDetailsSchema>) => {
    const validatedCredentials = userDetailsSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };
    const { userID, username, phone, date_of_birth, gender } = validatedCredentials.data;

    const phoneRegex = /^9[78]\d{8}$/;

    if (phone && !phoneRegex.test(phone)) {
        return { error: { phone: "Invalid Phone Number" } };
    }


    const existingPhone = await prisma.user.findFirst({
        where: {
            phone: phone,
            NOT: { id: userID }
        }
    })

    if (existingPhone) {
        return { error: { phone: "Phone Number Exists" } };
    }
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userID },
            data: {
                name: username,
                phone,
                birthDate: date_of_birth ? new Date(date_of_birth) : null,
                gender
            }
        });

        revalidatePath("/profile");
        return { success: true, user: updatedUser };
    } catch (error) {
        console.log(error);
        return { error: "An error occurred! Please try again" }
    }


}

// Update Password
export const updatePassword = async (data: z.infer<typeof passwordSchema>) => {
    const validatedCredentials = passwordSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    const { userID, currentPassword, newPassword, confirmPassword } = validatedCredentials.data;

    if (newPassword !== confirmPassword) {
        return { error: { confirmPassword: "Passwords don't match" } };
    }

    // Check if the current password is correct
    const user = await getUserById(userID);
    if (!user) return { error: "User not found" };
    const isCorrectPassword = await verifyPassword(currentPassword, user.password as string);

    if (!isCorrectPassword) {
        return { error: { currentPassword: "Incorrect Password" } };
    }

    try {

        const hashedPassword = await hashPassword(newPassword);
        await prisma.user.update({
            where: { id: userID },
            data: {
                password: hashedPassword
            }
        });
        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        return { error: "An error occurred! Please try again" }
    }

}


// Forgot and Reset Password

export const sendPasswordResetVerificationCode = async (data: z.infer<typeof emailSchema>) => {
    const validatedCredentials = emailSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    const { email } = validatedCredentials.data;

    const user = await getUserByEmail(email);

    if (!user) {
        return { success: false, error: "Sorry, we did not find an account with the above email" };
    }

    // Generate a token
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationExpires = new Date(Date.now() + 900000); // 15 mins

    // hash the token and store it in the database
    const hashedCode = crypto.createHash('sha256').update(verificationCode).digest('hex');


    await prisma.user.update({
        where: { email },
        data: {
            verificationCode: hashedCode,
            verificationExpires
        }
    });


    const subject = 'Password Reset Verification Code';
    const html = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4a4a4a;">Password Reset Verification Code - Studio Entertainment</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px;">${verificationCode}</h1>
        <p>This code will expire in <strong>15 minutes</strong>.</p>
        <p>If you didn't request this code, please ignore this email or contact support if you have concerns.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply to this email.</p>
      </body>
    </html>
  `
    // Send email
    try {

        await sendEmail({ to: email, subject, html });
    } catch (error) {

        return {
            success: false, error: "Failed to send an Email, Please try Again later"
        }
    }
    return { success: true, message: 'Verification code sent to your email.' };
}

// Verify Password Reset Code

export const verifyPasswordResetCode = async (data: z.infer<typeof otpSchema>, email: string) => {
    const validatedCredentials = otpSchema.safeParse(data);
    if (!validatedCredentials.success) return { success: false, error: "Invalid Credentials" };

    const { otp } = validatedCredentials.data;

    const user = await getUserByEmail(email);

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const hashedCode = crypto.createHash('sha256').update(otp).digest('hex');


    if (user.verificationCode !== hashedCode || !user.verificationExpires || user.verificationExpires < new Date()) {
        return { success: false, error: "Invalid or expired code" };
    }

    return { success: true, message: "Code verified successfully" };

}


// Reset Passoword
export const resetPassword = async (data: z.infer<typeof resetPasswordSchema>, email: string) => {
    const validatedCredentials = resetPasswordSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    const { newPassword, confirmPassword } = validatedCredentials.data;

    if (newPassword !== confirmPassword) {
        return { success: false, error: "Passwords don't match" };
    }

    const user = await getUserByEmail(email);

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where: { email },
        data: {
            password: hashedPassword,
            verificationCode: null,
            verificationExpires: null
        }
    });

    return { success: true, message: "Password reset successfully" };

}