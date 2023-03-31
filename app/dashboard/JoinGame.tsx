import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const getMap = async () => {
    const response = await axios.get(`/api/area`);
    return response.data;
}

export default function JoinGame({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const [toastId, setToastId] = useState('');

    const { mutate } = useMutation(
        async (game_id: number) => await axios.patch('/api/user/joinGame', { game_id }), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId })
                }
            },
            onSuccess: (data) => {
                toast.success('Vous avez rejoint la partie!', { id: toastId });
                queryClient.invalidateQueries({ queryKey: ['games'] });
                queryClient.invalidateQueries({ queryKey: ['user'] });
                queryClient.prefetchQuery({ queryKey: ['map'], queryFn: getMap });
            }
        }
    )
    
    const joinGame = () => {
        setToastId(toast.loading('Merci de patienter...'));
        mutate(id);
    }

    return (
        <button onClick={joinGame}>Rejoindre la partie</button>
    )
}
