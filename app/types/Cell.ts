import { AreaType } from "./Area";

export type LootType = { loot: string, rarity: string };
export type ZombieType = { attack: number, defense: number };

export type CellType = {
    id: number,
    x: number,
    y: number,
    loot?: LootType,
    zombie?: ZombieType,
    area?: AreaType,
    area_id: number
};
