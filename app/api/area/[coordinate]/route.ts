import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

type Params = { params: { coordinate: string } };

export async function GET(request: Request, { params }: Params) {
    // const session = await getServerSession(authOptions);
    // if (!session.user) return new Response('Vous devez être identifié pour accéder à cette page!', { status: 401 });

    // const user = session.user;
    // if (!user.game_id) return new Response('Vous devez rejoindre une partie pour accéder à cette page!', { status: 401 });

    const response = await prisma.area.findFirst({
        where: {
            // game_id: user.game_id
            game_id: 1,
            coordinate: params.coordinate         
        },
        include: {
            cells: {
                orderBy: [
                    {
                        y: 'asc',
                    },
                    {
                        x: 'asc',
                    }
                ]
            }
        }
    })
    return NextResponse.json(response);
}
