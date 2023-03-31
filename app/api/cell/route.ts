import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CellType, LootType, ZombieType } from '@/app/types/Cell';
import { AreaType, Biomes } from '@/app/types/Area';

enum Loots { 'ALTAR', 'CHEST', 'FOOD', 'GARDEN', 'RESOURCE', 'WEAPON' };
enum Rarities { 'COMMUN', 'INCOMMUN', 'RARE', 'EPIC', 'LEGENDARY' };

// Modif en fonction du biome
const getLoot = (biome: keyof typeof Biomes, level: number): LootType| undefined => {
    const random = Math.random();
    const getRarity = () => Rarities[Math.floor(Math.random() * (level + 1))];
    if (random < 0.02) return { loot: Loots[0], rarity: getRarity() };
    else if (random < 0.04) return { loot: Loots[1], rarity: getRarity() };
    else if (random < 0.06) return { loot: Loots[2], rarity: getRarity() };
    else if (random < 0.08) return { loot: Loots[3], rarity: getRarity() };
    else if (random < 0.10) return { loot: Loots[4], rarity: getRarity() };
    return undefined;
};
// Puissance en fonction du level
const getZombie = (level: number): ZombieType| undefined => {
    const random = Math.random();
    if (random < 0.10) return { attack: 5, defense: 8 };
    return undefined;
};

export async function POST(request: Request) {
    const areas: AreaType[] = await request.json();
    
    // const session = await getServerSession(authOptions);
    // if (!session) return new Response('Vous devez être identifié pour accéder à cette page!');
    // Check admin?

    const size = 9;
    const cells: Omit<CellType, 'id'>[] = [];

    for (let area of areas) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell: Omit<CellType, 'id'> = {
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
    }
    const response = await prisma.cell.createMany({
        data: cells
    })
    return NextResponse.json(cells);
}
