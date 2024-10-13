import { prisma } from './prisma'


export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({ where: { id } });
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}


export const createUser = async (email: string, password: string, username: string) => {
    return await prisma.user.create({ data: { email, password, username, emailVerified: new Date() } });
}

