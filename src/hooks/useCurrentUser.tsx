
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";



export const useCurrentUser = () => {
    const { data: session, status } = useSession();

    const isLoading = status === "loading";


    return { user: session?.user as unknown as User, isLoading };


}