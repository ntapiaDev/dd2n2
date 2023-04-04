import useUser from "@/app/hooks/useUser";
import { GameType } from "@/app/types/Game";
import DeleteGame from "./DeleteGame";
import JoinGame from "./JoinGame";
import LeaveGame from "./LeaveGame";

export default function Game({ id, day, users }: GameType) {
    const user = useUser();
    return (
        <div>
            <h4>Partie {id}</h4>
            <p>Jour {day}</p>
            {users ? users.map((user, i: number) => <p key={i}>{user.username}</p>) : ''}
            {!users?.find(u => u.id === user?.id) && <JoinGame id={id} />}
            {users?.find(u => u.id === user?.id) && <LeaveGame id={id} />}
            {user?.role === 'ADMIN' && <DeleteGame id={id} />}
        </div>
    )
}
