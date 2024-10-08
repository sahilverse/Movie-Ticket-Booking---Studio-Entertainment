"use server";

import { signIn } from "@/auth";
import { registerSchema } from "@/lib/zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const registerCredentials = async (data: z.infer<typeof registerSchema>) => {
    const validatedCredentials = registerSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    const { email, password, username } = validatedCredentials.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });

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

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, password: hashedPassword, name: username, emailVerified: new Date() } });
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });

    return { success: true };
};