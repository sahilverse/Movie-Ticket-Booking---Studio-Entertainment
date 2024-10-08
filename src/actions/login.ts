"use server";
import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation"

import * as z from "zod";


export const credentialsLogin = async (data: z.infer<typeof signInSchema>) => {
    const validatedCredentials = signInSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    try {
        const { email, password } = validatedCredentials.data;
        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });

        if (result?.error) {
            return { error: "Invalid Email or Password" };
        }
        redirect(DEFAULT_LOGIN_REDIRECT);

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": return { error: "Invalid Email or Password" };
                default: return { error: "An error occurred! Please try again" };
            }
        }
        throw error;
    }

};