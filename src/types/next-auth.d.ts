import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            phone?: string;
            city: string;
            birthDate?: string;
            gender?: string;
            createdAt?: string;
        } & DefaultSession["user"];
    }

}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        phone?: string;
        city: string;
        birthDate?: string;
        gender?: string;
        createdAt?: string;

    }
}