import prisma from '@/prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

export async function PATCH() {

    const session = await getServerSession(authOptions);
    if (!session) return new Response('Vous devez être identifié pour accéder à cette page!');

    try {
        const response = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                game_id: null
            }
        })
    } catch (err: any) {
        console.log(err.message);

    }
    return new Response('Vous avez quitté la partie');
}
