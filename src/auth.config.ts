import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { type NextAuthConfig } from "next-auth"
import { signInSchema } from "@/lib/zod"
import { getUserByEmail } from "@/lib/utils"
import { verifyPassword } from "./lib/password"


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

                const user = await getUserByEmail(email);


                if (!user || !user.password) return null;

                const isValidPassword = await verifyPassword(password, user.password);

                if (!isValidPassword) return null;

                return user;
            }

        }

        )],

} satisfies NextAuthConfig