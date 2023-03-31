// import axios from 'axios';
import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await prisma.game.findMany({
            orderBy: {
                id: 'asc'
            },
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
        // try {
        //     const revalidate = await axios.get(`${process.env.BASE_URL}/api/revalidate?token=${process.env.REVALIDATE_TOKEN}&target=dashboard`);
        // } catch (err: any) {
        //     new Response(err.message, { status: 500 });
        // }
        return NextResponse.json(response);
    } catch (err: any) {
        return new Response(err.message, { status: 400 });
    }
}
