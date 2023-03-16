import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

enum Loots { 'ALTAR', 'CHEST', 'GARDEN', 'RESOURCE', 'WEAPON' };
enum Rarities { 'COMMUN', 'INCOMMUN', 'RARE', 'EPIC', 'LEGENDARY' };
enum Biome { 'CITY', 'FOREST', 'MOUNTAIN', 'DESERT' };

type Loot = { loot: string, rarity: string } | null;
type Zombie = { attack: number, defense: number } | null;

// Modif en fonction du biome
const getLoot = (biome: Biome, level: number): Loot => {
    const random = Math.random();
    const getRarity = () => Rarities[Math.floor(Math.random() * (level + 1))];
    if (random < 0.02) return { loot: Loots[0], rarity: getRarity() };
    else if (random < 0.04) return { loot: Loots[1], rarity: getRarity() };
    else if (random < 0.06) return { loot: Loots[2], rarity: getRarity() };
    else if (random < 0.08) return { loot: Loots[3], rarity: getRarity() };
    else if (random < 0.10) return { loot: Loots[4], rarity: getRarity() };
    return null;
};
// Puissance en fonction du level
const getZombie = (level: number): Zombie => {
    const random = Math.random();
    if (random < 0.10) return { attack: 5, defense: 8 };
    return null;
};

type Cell = {
    area_id: number,
    x: number,
    y: number,
    loot?: Loot,
    zombie?: Zombie
};

export async function POST(request: Request) {
    const area = await request.json();

    // const session = await getServerSession(authOptions);
    // if (!session) return new Response('Vous devez être identifié pour accéder à cette page!');
    //Check admin?

    const size = 9;
    const cells: Cell[] = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell: Cell = {
                area_id: area.id,
                x: j + 1,
                y: i + 1,
            };
            if (cell.x != 5 || cell.y != 5) {
                const loot = getLoot(area.biome, area.level);
                if (loot) cell.loot = loot;
                else {
                    const zombie = getZombie(area.level);
                    if (zombie) cell.zombie = zombie;
                }
            }
            cells.push(cell);
        }
    }
    const response = await prisma.cell.createMany({
        data: cells
    })
    return NextResponse.json(response);
}