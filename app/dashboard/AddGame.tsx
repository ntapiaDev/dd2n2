import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddGame() {
    const queryClient = useQueryClient();

    const [toastId, setToastId] = useState('');
    let game_id: number;

    const { mutate } = useMutation(
        async () => await axios.post('api/game', {}), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId });
                }
            },
            onSuccess: async (data) => {
                game_id = data.data.id;
                await axios.post('api/area', {
                    game_id
                });
                const areas = await axios.get(`api/area?game_id=${game_id}`);
                await axios.post('api/cell', 
                    areas.data
                );
                toast.success("Partie créée 🔥", { id: toastId });
                queryClient.invalidateQueries({ queryKey: ['games'] });
            },
            onSettled: async (data, error) => {
                if (error) {
                    if (error instanceof AxiosError) {
                        toast.error(error.message, { id: toastId });
                    }
                    await axios.delete(`api/game/${game_id}`);
                }
            }
        }
    )

    const addGame = async () => {
        setToastId(toast.loading("Création d'une partie..."));
        mutate();
    }

    return (
        <button onClick={addGame}>Ajouter une partie</button>
    )
}
