export enum Biomes { CITY = 'CITY', FOREST = 'FOREST', MOUNTAIN = 'MOUNTAIN', DESERT = 'DESERT' };

export type AreaType = {
    game_id: number,
    x: number,
    y: number,
    biome: Biomes,
    level: number
};
