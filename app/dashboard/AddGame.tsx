import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddGame() {
    const queryClient = useQueryClient();

    const [toastId, setToastId] = useState('');
    let game_id: number;

    const { mutate } = useMutation(
        async () => await axios.post('api/game/', {}), {
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

    const addGame = async (e: React.FormEvent) => {
        e.preventDefault();
        setToastId(toast.loading("Création d'une partie..."));
        mutate();
    }

    return (
        <form onSubmit={addGame}>
            <button>Ajouter une partie</button>
        </form>
    )
}
