import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

const getMap = async () => {
    const response = await axios.get(`/api/area`);
    return response.data;
}

export default function JoinGame({ id }: { id: number }) {
    const queryClient = useQueryClient();

    let toastId: string;

    const { mutate } = useMutation(
        async (game_id: number) => await axios.patch('/api/user/joinGame/', { game_id }), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId })
                }
            },
            onSuccess: (data) => {
                toast.success('Vous avez rejoint la partie!', { id: toastId });
                queryClient.invalidateQueries('games');
                queryClient.prefetchQuery('map', getMap);
            }
        }
    )
    
    const joinGame = () => {
        toastId = toast.loading('Merci de patienter...', { id: toastId });
        mutate(id);
    }

    return (
        <button onClick={joinGame}>Rejoindre la partie</button>
    )
}
