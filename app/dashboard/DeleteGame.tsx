import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DeleteGame({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const [toastId, setToastId] = useState('');

    const { mutate } = useMutation(
        async (id: number) => await axios.delete(`/api/game/${id}`), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId });
                }
            },
            onSuccess: (data) => {
                toast.success('La partie a bien été supprimée!', { id: toastId });
                queryClient.invalidateQueries({ queryKey: ['games'] });
            }
        }
    )

    const deleteGame = () => {
        setToastId(toast.loading('Suppression en cours...'));
        mutate(id);
    }

    return (
        <button onClick={deleteGame}>Supprimer</button>
    )
}
