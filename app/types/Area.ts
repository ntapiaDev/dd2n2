import { CellType } from "./Cell";
import { GameType } from "./Game";
import { UserType } from "./User";

export enum Biomes { CITY = 'CITY', DESERT = 'DESERT', FOREST = 'FOREST', LAKE = 'LAKE', MOUNTAIN = 'MOUNTAIN' };

export type AreaType = {
    id: number,
    x: number,
    y: number,
    biome: keyof typeof Biomes,
    level: number,
    game?: GameType,
    game_id: number,
    user?: UserType,
    user_id? : number,
    cells?: CellType[]
};
