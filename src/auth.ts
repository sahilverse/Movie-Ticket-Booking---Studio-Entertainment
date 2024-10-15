import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import { getUserByEmail } from "./lib/utils";


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }

    },
    callbacks: {
        async session({ session, token }) {

            if (session.user && token) {
                session.user.id = token.sub;
                session.user.phone = token.phone;
                session.user.city = token.city;
                session.user.birthDate = token.birthDate;
                session.user.gender = token.gender;
            }
            return session;
        },

        async jwt({ token }) {
            if (token) {
                const { email } = token as { email: string };
                const user = await getUserByEmail(email);

                if (user) {
                    token.city = user.city;
                    token.phone = user.phone ?? undefined;
                    token.birthDate = user.birthDate ? user.birthDate.toISOString() : undefined;
                    token.gender = user.gender ?? undefined;
                }
            }

            return token;
        },

        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existingUser = await getUserByEmail(user.email as string);
                const { providerAccountId, provider, access_token, id_token, type } = account;

                if (existingUser && existingUser.password) {
                    await prisma.account.upsert({
                        where: {
                            provider_providerAccountId: {
                                provider: provider,
                                providerAccountId: providerAccountId,
                            },
                        },
                        update: {
                            access_token: access_token,
                            id_token: id_token,
                        },
                        create: {
                            userId: existingUser.id,
                            provider: provider,
                            providerAccountId: providerAccountId,
                            access_token: access_token,
                            id_token: id_token,
                            type: type,
                        },
                    });
                }

                return true;
            }

            if (account?.provider === "credentials") {
                return true;
            }
            return false;
        }


    },
    ...authConfig,
})

