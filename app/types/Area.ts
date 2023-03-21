export enum Biomes { CITY = 'CITY', DESERT = 'DESERT', FOREST = 'FOREST', LAKE = 'LAKE', MOUNTAIN = 'MOUNTAIN' };

export type AreaType = {
    game_id: number,
    x: number,
    y: number,
    biome: keyof typeof Biomes,
    level: number
};
