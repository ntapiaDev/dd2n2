export type LootType = { loot: string, rarity: string };
export type ZombieType = { attack: number, defense: number };

export type CellType = {
    area_id: number,
    x: number,
    y: number,
    loot?: LootType,
    zombie?: ZombieType
};
