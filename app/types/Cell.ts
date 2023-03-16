export type LootType = { loot: string, rarity: string } | undefined;
export type ZombieType = { attack: number, defense: number } | undefined;

export type CellType = {
    area_id: number,
    x: number,
    y: number,
    loot?: LootType,
    zombie?: ZombieType
};
