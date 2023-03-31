import { AreaType } from "./Area"
import { GameType } from "./Game"

export enum Role { USER = 'USER', ADMIN = 'ADMIN'};

export type UserType = {
    id: number,
    username: string,
    password: string,
    role: keyof typeof Role,
    game?: GameType,
    game_id?: number,
    area?: AreaType
}
