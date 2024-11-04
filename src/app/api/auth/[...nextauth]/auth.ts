import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"


import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/utils";


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
                session.user.id = token.id;
                session.user.phone = token.phone;
                session.user.birthDate = token.birthDate;
                session.user.gender = token.gender;
                session.user.createdAt = token.createdAt;
            }

            return session;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {

                const { id, phone, birthDate, gender, createdAt } = user as User;
                token.id = id;
                token.phone = phone ?? undefined;
                token.birthDate = birthDate?.toISOString() ?? undefined;
                token.gender = gender ?? undefined;
                token.createdAt = createdAt?.toISOString() ?? undefined
            }

            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.phone = session.user.phone;
                token.birthDate = session.user.birthDate;
                token.gender = session.user.gender;
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

