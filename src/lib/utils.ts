import { prisma } from './prisma'


export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
};


export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({ where: { id } });
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}


export const createUser = async (email: string, password: string, name: string) => {
    return await prisma.user.create({ data: { email, password, name, emailVerified: new Date() } });
}

