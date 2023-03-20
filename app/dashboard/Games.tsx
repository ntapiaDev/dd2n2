'use client';
import axios from "axios";
import { useQuery } from "react-query";
import { GameType } from "../types/Game";

import AddGame from "./AddGame";
import Game from "./Game";

const getGames = async () => {
    const response = await axios.get('/api/game');
    return response.data;
}

export default function Games() {
    const { data, error, isLoading } = useQuery<GameType[]>({ queryFn: getGames, queryKey: ['games'] });
    if (error) return <p>Échec du chargement!</p>;
    if (isLoading) return <p>Chargement de la liste des parties...</p>;
    return (
        <>
            <h3>Rejoindre une partie :</h3>
            {data?.map(game => <Game key={game.id} id={game.id} day={game.day} users={game.users} />)}
            <AddGame />
        </>
    )
}
