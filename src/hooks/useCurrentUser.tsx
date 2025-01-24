
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";


// This hook uses the useSession hook from next-auth to get the current user's session data
// It returns an object containing the user data and a loading state
export const useCurrentUser = () => {
    const { data: session, status } = useSession();

    const isLoading = status === "loading";


    return { user: session?.user as unknown as User, isLoading };


}