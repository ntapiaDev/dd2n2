import { useSession } from "next-auth/react";
import { GameType } from "../types/Game";
import DeleteGame from "./DeleteGame";
import JoinGame from "./JoinGame";
import LeaveGame from "./LeaveGame";

export default function Game({ id, day, users }: GameType) {
    const { data: session } = useSession();
    return (
        <div>
            <h4>Partie {id}</h4>
            <p>Jour {day}</p>
            {users ? users.map((user, i) => <p key={i}>{user.username}</p>) : ''}
            {!users.find(u => u.id === session?.user?.id) && <JoinGame id={id} />}
            {users.find(u => u.id === session?.user?.id) && <LeaveGame id={id} />}
            <DeleteGame id={id} />
        </div>
    )
}
