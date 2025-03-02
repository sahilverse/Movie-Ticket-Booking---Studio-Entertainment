import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { User } from "@prisma/client";




export const currentUser = async () => {

    const session = await auth();

    return session?.user as unknown as User;
}