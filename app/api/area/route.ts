import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function GET() {
    // const session = await getServerSession(authOptions);
    // if (!session.user) return new Response('Vous devez être identifié pour accéder à cette page!', { status: 401 });

    // const user = session.user;
    // if (!user.game_id) return new Response('Vous devez rejoindre une partie pour accéder à cette page!', { status: 401 });

    const response = await prisma.area.findMany({
        where: {
            // game_id: user.game_id
            game_id: 1
        },
    })
    return NextResponse.json(response);
}
