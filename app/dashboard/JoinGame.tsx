import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

export default function JoinGame({ id }: { id: number }) {

    let toastId: string;
    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        async (game_id: number) => await axios.patch('/api/user/joinGame/', { game_id }),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId })
                }
            },
            onSuccess: (data) => {
                toast.success('Vous avez rejoint la partie!', {id: toastId});
                queryClient.invalidateQueries(['games']);
            }
        }
    )
    const joinGame = () => {
        toastId = toast.loading('Merci de patienter...', {id: toastId});
        mutate(id);
    }

  return (
    <button onClick={joinGame}>Rejoindre la partie</button>
  )
}
