import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function PATCH() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new Response('Vous devez être identifié pour accéder à cette page!', { status: 401 });

    try {
        const response = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                game_id: null
            }
        })
        return NextResponse.json(response);
    } catch (err: any) {
        return new Response(err.message, { status: 400 });
    }
}
