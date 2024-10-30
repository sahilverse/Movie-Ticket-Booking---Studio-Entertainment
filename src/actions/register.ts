"use server";

import { signIn } from "@/app/api/auth/[...nextauth]/auth";
import { registerSchema } from "@/lib/zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { getUserByEmail } from "@/lib/utils";

export const registerCredentials = async (data: z.infer<typeof registerSchema>) => {
    const validatedCredentials = registerSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    const { email, password, username, phone, date_of_birth } = validatedCredentials.data;
    const existingUser = await getUserByEmail(email);


    if (existingUser) {
        if (!existingUser.password) {
            await prisma.user.update({
                where: { id: existingUser.id },
                data: { password: await bcrypt.hash(password, 10) },
            });
            await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
        } else {
            return { error: "User already exists" };
        }
    }

    const existingPhone = await prisma.user.findFirst({ where: { phone } });

    if (existingPhone) {
        return { error: "Phone number already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: username,
            phone,
            birthDate: new Date(date_of_birth),
        },
    });
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });

    return { success: true };
};
