import { GameType } from "../types/Game";
import { UserType } from "../types/User";
import DeleteGame from "./DeleteGame";
import JoinGame from "./JoinGame";
import LeaveGame from "./LeaveGame";

type Props = {
    game: GameType;
    user: UserType;
}

export default function Game({ game: { id, day, users }, user }: Props) {
    return (
        <div>
            <h4>Partie {id}</h4>
            <p>Jour {day}</p>
            {users ? users.map((user, i: number) => <p key={i}>{user.username}</p>) : ''}
            {!users?.find(u => u.id === user.id) && <JoinGame id={id} />}
            {users?.find(u => u.id === user.id) && <LeaveGame id={id} />}
            {user.role === 'ADMIN' && <DeleteGame id={id} />}
        </div>
    )
}
