import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
}

