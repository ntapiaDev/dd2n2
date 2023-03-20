import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { AreaType, Biomes } from '@/app/types/Area';

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
        orderBy: [
            {
                y: 'asc',
            },
            {
                x: 'asc',
            }
        ]
    })
    return NextResponse.json(response);
}

export async function POST(request: Request) {
    const game = await request.json();
    const size = 9;
    const areas: AreaType[] = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const area: AreaType = {
                game_id: game.id,
                x: j + 1,
                y: i + 1,
                biome: Biomes.CITY,
                level: 1
            };
            areas.push(area);
        }
    }

    const response = await prisma.area.createMany({
        data: areas
    })
    return NextResponse.json(response);
}
