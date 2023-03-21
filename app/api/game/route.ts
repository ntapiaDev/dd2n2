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
        return new Response(err.message, { status: 400 });
    }
}

export async function POST() {
    try {
        const response = await prisma.game.create({
            data: {}
        });
        return NextResponse.json(response);
    } catch (err: any) {
        return new Response(err.message, { status: 400 });
    }
}
