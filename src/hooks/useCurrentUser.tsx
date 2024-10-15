import { formatDate } from "@/lib/utils";
import { useSession } from "next-auth/react";



export const useCurrentUser = () => {
    const { data: session, status } = useSession();

    const isLoading = status === "loading";

    if (session) {

        if (session.user.birthDate) {
            session.user.birthDate = formatDate(new Date(session.user.birthDate));
        }
    }

    return { user: session?.user, isLoading };


}