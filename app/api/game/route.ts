import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await prisma.game.findMany({
            include: {
                users: true
            }
        });
        return NextResponse.json(response);
    } catch (err: any) {
        return new Response('Erreur...', { status: 400 });
    }
}

export async function POST() {
    try {
        const response = await prisma.game.create({
            data: {}
        });
    } catch (err: any) {
        console.log(err.message);

    }
    return new Response('Partie créée');
}

export async function DELETE(request: Request) {
    const id = await request.json()    
    try {
        const response = await prisma.game.delete({
            where: {
                id: id
            }
        });
    } catch (err: any) {
        console.log(err.message);

    }
    return new Response('Partie supprimée');
}
