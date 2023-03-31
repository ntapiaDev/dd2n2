import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function LeaveGame({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const [toastId, setToastId] = useState('');

    const { mutate } = useMutation(
        async (game_id: number) => await axios.patch('/api/user/leaveGame', { game_id }), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId });
                }
            },
            onSuccess: (data) => {
                toast.success('Vous avez quitté la partie!', { id: toastId });
                queryClient.invalidateQueries({ queryKey: ['games'] });
                queryClient.invalidateQueries({ queryKey: ['user'] });
            }
        }
    )

    const leaveGame = () => {
        setToastId(toast.loading('Merci de patienter...'));
        mutate(id);
    }

    return (
        <button onClick={leaveGame}>Quitter la partie</button>
    )
}
