import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AreaType, Biomes } from '@/app/types/Area';
import { getDistance } from '@/app/utils/tools';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new Response('Vous devez être identifié pour accéder à cette page!', { status: 401 });

    const user = session.user;
    if (!user.game_id) return new Response('Vous devez rejoindre une partie pour accéder à cette page!', { status: 401 });

    const url = new URL(request.url);
    const x = url.searchParams.get('x');
    const y = url.searchParams.get('y');

    if (x && y) {
        try {
            const response = await prisma.area.findFirst({
                where: {
                    game_id: user.game_id,
                    x: parseInt(x),
                    y: parseInt(y)
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
        } catch (err: any) {
            return new Response(err.message, { status: 400 });
        }
    }

    try {
        const response = await prisma.area.findMany({
            where: {
                game_id: user.game_id
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
    } catch (err: any) {
        return new Response(err.message, { status: 400 });
    }
}

export async function POST(request: Request) {
    const { game_id } = await request.json();
    const size = 9;
    const encampment = { x: Math.ceil(size/2), y: Math.ceil(size/2) };
    const areas: AreaType[] = [];

    const keys = Object.keys(Biomes);
    let biome = keys[Math.floor(Math.random() * keys.length)] as keyof typeof Biomes;

    const repeatX = (x: number, y: number) => {
        return areas.find(a => a.y === y && a.x === x - 3)?.biome === areas.find(a => a.y === y && a.x === x - 2)?.biome && areas.find(a => a.y === y && a.x === x - 1)?.biome
    }
    const repeatY = (x: number, y: number) => {
        return areas.find(a => a.y === y - 3 && a.x === x)?.biome === areas.find(a => a.y === y - 2 && a.x === x)?.biome && areas.find(a => a.y === y - 1 && a.x === x)?.biome
    }

    for (let i = 1; i < size + 1; i++) {
        for (let j = 1; j < size + 1; j++) {
            if (j === encampment.x && i === encampment.y) biome = 'CITY';
            else {
                if (i > 1) biome = areas.find(a => a.y === i - 1 && a.x === j)?.biome ?? 'CITY';
                if (j > 1 && areas.find(a => a.y === i && a.x === j - 1)?.biome === biome) {                 
                    if (j > 3 && repeatX(j, i)) biome = keys[Math.floor(Math.random() * keys.length)] as keyof typeof Biomes;
                } else {
                    if (i > 3 && repeatY(j, i)) biome = keys[Math.floor(Math.random() * keys.length)] as keyof typeof Biomes;
                }
            }
            const level = Math.ceil((getDistance(j, i, encampment) / 2) + (-1 + Math.random() * 2));
            const area: AreaType = {
                game_id,
                x: j,
                y: i,
                biome,
                level: (j === encampment.x && i === encampment.y ? 0 : level > 0 ? level : 1)
            };
            areas.push(area);
        }
    }

    const response = await prisma.area.createMany({
        data: areas
    })
    return NextResponse.json(response);
}
