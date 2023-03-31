import { AreaType } from "./Area"
import { UserType } from "./User"

export type GameType = {
    id: number,
    day: number,
    areas?: AreaType[],
    users?: UserType[]
}
