import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

import { UserType } from "./types/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // Google authentication provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Credentials authentication provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            // Authorization function for credentials provider
            authorize: async (
                credentials: Partial<Record<"email" | "password", unknown>>
            ): Promise<UserType | null> => {
                const { email, password } = credentials;

                if (!email || !password) {
                    throw new CredentialsSignin("Email and password are required");
                }

                try {
                    // Validate credentials using Zod schema
                    const { email, password } = await signInSchema.parseAsync(credentials);


                    const user = await prisma.user.findUnique({
                        where: { email },

                    });

                    if (!user) {
                        throw new CredentialsSignin("No user found");
                    }

                    // Compare provided password with the stored hashed password
                    const isValidPassword = await bcrypt.compare(password, user.password as string);

                    if (!isValidPassword) {
                        throw new CredentialsSignin("Invalid password");
                    }

                    // Exclude sensitive fields from the user object before returning
                    const { password: _, googleId, ...rest } = user;



                    return rest as UserType;

                } catch (error) {
                    // Handle validation errors
                    if (error instanceof ZodError) {
                        return null;
                    } else {
                        throw new CredentialsSignin("An error occurred during authentication");
                    }
                }
            },
        }),
    ],

    pages: {
        signIn: "/user/signin",
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider === "google") {
                try {
                    const { email, name, id } = user as { email: string; name: string; id: string };

                    const existingUser = await prisma.user.findFirst({
                        where: { email },
                    });


                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                email,
                                name,
                                googleId: id,
                            },
                        });
                    }

                    return true;

                } catch (error) {

                    throw new AuthError("An error occurred during authentication");

                }


            }
            if (account?.provider === "Credentials") {
                return true;
            }
            return false;
        }
    }
});
