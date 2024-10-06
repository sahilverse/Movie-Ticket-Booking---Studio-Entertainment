"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

import * as z from "zod";


export const credentialsLogin = async (data: z.infer<typeof signInSchema>) => {

    const validatedCredentials = signInSchema.safeParse(data);

    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    try {
        const { email, password } = validatedCredentials.data;
        await signIn("credentials", {
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });

        return { success: "Successfully Signed In" };

    } catch (error) {

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": return { error: "Invalid Email or Password" };
                default: return { error: "An error occurred" };
            }
        }
        throw error;
    }



};

export const googleLogin = async () => {

    await signIn("google", {
        callbackUrl: DEFAULT_LOGIN_REDIRECT
    });

};