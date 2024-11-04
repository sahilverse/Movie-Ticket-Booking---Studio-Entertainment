"use server";

import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/utils";
import { passwordSchema, userDetailsSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import bcrypt from "bcryptjs"


export async function updateUserDetails(data: z.infer<typeof userDetailsSchema>) {
    const validatedCredentials = userDetailsSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };
    const { userID, username, phone, date_of_birth, gender } = validatedCredentials.data;

    const existingPhone = await prisma.user.findFirst({
        where: {
            phone,
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
                birthDate: new Date(date_of_birth),
                gender
            }
        });

        revalidatePath("/profile");
        return { success: true, user: updatedUser };
    } catch (error) {
        return { error: "An error occurred! Please try again" }
    }


}


export async function updatePassword(data: z.infer<typeof passwordSchema>) {
    const validatedCredentials = passwordSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    const { userID, currentPassword, newPassword, confirmPassword } = validatedCredentials.data;

    if (newPassword !== confirmPassword) {
        return { error: { confirmPassword: "Passwords don't match" } };
    }

    // Check if the current password is correct
    const user = await getUserById(userID);

    const isCorrectPassword = await bcrypt.compare(currentPassword, user?.password ?? "");

    if (!isCorrectPassword) {
        return { error: { currentPassword: "Incorrect Password" } };
    }

    try {

        const hashedPassword = await bcrypt.hash(newPassword, 10);
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