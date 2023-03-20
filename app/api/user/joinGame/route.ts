import prisma from '@/prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

export async function PATCH(request: Request) {

    const session = await getServerSession(authOptions);
    if (!session) return new Response('Vous devez être identifié pour accéder à cette page!');

    const data = await request.json();

    try {
        const response = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                game_id: data.game_id
            }
        })
    } catch (err: any) {
        console.log(err.message);

    }
    return new Response('Vous avez quitté la partie');
}
