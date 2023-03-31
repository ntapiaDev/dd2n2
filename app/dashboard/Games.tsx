'use client';

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GameType } from "../types/Game";
import { UserType } from "../types/User";
import AddGame from "./AddGame";
import Game from "./Game";

const getGames = async () => {
    const response = await axios.get('/api/game');
    return response.data;
}

export default function Games({ user }: { user: UserType }) {
    const { data, error, isLoading } = useQuery<GameType[]>({ queryKey: ['games'], queryFn: getGames });
    if (error) return <p>Échec du chargement!</p>;
    if (isLoading) return <p>Chargement de la liste des parties...</p>;
    
    return (
        <>
            <h3>Rejoindre une partie :</h3>
            {data?.map(game => <Game key={game.id} game={game} user={user} />)}
            {user.role === 'ADMIN' && <AddGame />}
        </>
    )
}
