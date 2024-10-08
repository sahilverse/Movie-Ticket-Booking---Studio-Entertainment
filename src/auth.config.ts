import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { type NextAuthConfig } from "next-auth"
import { signInSchema } from "./lib/zod"
import { prisma } from "@/lib/prisma"

import bcrypt from "bcryptjs"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {

                const validatedCredentials = signInSchema.safeParse(credentials);

                if (!validatedCredentials.success) return null;

                const { email, password } = validatedCredentials.data;

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                })


                if (!user || !user.password) return null;

                const isValidPassword = await bcrypt.compare(password, user.password as string);

                if (!isValidPassword) return null;

                return user;
            }

        }

        )],

} satisfies NextAuthConfig