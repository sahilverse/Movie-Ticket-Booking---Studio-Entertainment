import NextAuth from "next-auth"
import authConfig from "./auth.config"


import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    callbacks: {

        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });
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

