import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const response = await prisma.game.findFirst({
            where: {
                id: parseInt(params.id)
            },
            include: {
                areas: {
                    orderBy: [
                        {
                            y: 'asc',
                        },
                        {
                            x: 'asc',
                        }
                    ]
                }
            },
        });
        return NextResponse.json(response);
    } catch (err: any) {
        return new Response(err.message, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } } ) {
    try {
        const response = await prisma.game.delete({
            where: {
                id: parseInt(params.id)
            }
        });
        return NextResponse.json(response);
    } catch (err: any) {
        return new Response(err.message, { status: 400 });
    }
}
