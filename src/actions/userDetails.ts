"use server";

import { prisma } from "@/lib/prisma";
import { userDetailsSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import * as z from "zod";


export async function updateUserDetails(data: z.infer<typeof userDetailsSchema>) {

    const validatedCredentials = userDetailsSchema.safeParse(data);
    if (!validatedCredentials.success) return { error: "Invalid Credentials" };

    const { userID, username, phone, date_of_birth, gender } = validatedCredentials.data;

    const existingPhone = await prisma.user.findFirst({
        where: {
            phone,
            NOT: { id: userID }
        }
    })

    if (existingPhone) {
        return { error: { phone: "Phone Number Exists" } };
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userID },
            data: {
                name: username,
                phone,
                birthDate: new Date(date_of_birth),
                gender
            }
        });

        revalidatePath("/profile");
        return { success: true, user: updatedUser };
    } catch (error) {
        return { error: "An error occurred! Please try again" }
    }



}