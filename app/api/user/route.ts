import bcrypt from 'bcrypt';
import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { USER_REGEX, PASSWORD_REGEX } from '../../login/regex';

export async function GET() {
    try {
        const response = await prisma.user.findMany();
        return NextResponse.json(response);
    } catch (err: any) {
        return new Response('Erreur...', { status: 400 });
    }
}

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (!username || !password) return new Response('Merci de remplir tous les champs!', { status: 400 });
    if (!USER_REGEX.test(username)) return new Response('Votre identifiant est invalide!', { status: 400 });
    if (!PASSWORD_REGEX.test(password)) return new Response('Votre mot de passe est invalide!', { status: 400 });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const response = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        });
    } catch (err: any) {
        if (err.code === 'P2002' && err.meta.target[0] === 'username') return new Response('Cet identifiant est déjà pris!', { status: 400 });
        return new Response('Erreur dans la création de votre compte utilisateur!', { status: 400 });
    }
    return new Response('Utilisateur créé, vous pouvez maintenant vous connecter.');
}
