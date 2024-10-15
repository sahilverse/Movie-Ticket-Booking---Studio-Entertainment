import { auth } from "@/auth";

import { formatDate } from "@/lib/utils";



export const currentUser = async () => {
    const session = await auth();
    if (session) {

        if (session.user.birthDate) {
            session.user.birthDate = formatDate(session.user.birthDate);
        }
    }

    return session?.user;
}