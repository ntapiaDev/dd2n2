import { CellType } from "./Cell";

export enum Biomes { CITY = 'CITY', DESERT = 'DESERT', FOREST = 'FOREST', LAKE = 'LAKE', MOUNTAIN = 'MOUNTAIN' };

export type AreaType = {
    id?: number,
    game_id: number,
    x: number,
    y: number,
    biome: keyof typeof Biomes,
    level: number,
    cells?: CellType[]
};
