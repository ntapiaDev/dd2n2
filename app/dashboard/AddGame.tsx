import { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddGame() {
    const queryClient = useQueryClient();

    let game_id: number;
    let toastId: string;

    const { mutate } = useMutation(
        async () => await axios.post('api/game/', {}), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId })
                }
            },
            onSuccess: async (data) => {
                game_id = data.data.id;
                await axios.post('api/area', {
                    game_id
                })
                toast.success("Partie créée 🔥", { id: toastId });
                // CF gestion des états pour ajouter directement en cache
                queryClient.invalidateQueries(["games"]);
            },
            onSettled: async (data, error) => {
                if (error) {
                    if (error instanceof AxiosError) {
                        toast.error(error.message, { id: toastId })
                    }
                    await axios.delete(`api/game/${game_id}`);
                }
            }
        }
    )

    const addGame = async (e: React.FormEvent) => {
        e.preventDefault();
        toastId = toast.loading("Création d'une partie...", { id: toastId });
        mutate();
    }

    return (
        <form onSubmit={addGame}>
            <button>Ajouter une partie</button>
        </form>
    )
}
