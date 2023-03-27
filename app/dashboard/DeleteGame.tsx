import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

export default function DeleteGame({ id }: { id: number }) {
    const queryClient = useQueryClient();

    let toastId: string;

    const { mutate } = useMutation(
        async (id: number) => await axios.delete(`/api/game/${id}`), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, { id: toastId });
                }
            },
            onSuccess: (data) => {
                toast.success('La partie a bien été supprimée!', { id: toastId });
                queryClient.invalidateQueries(['games']);
            }
        }
    )

    const deleteGame = () => {
        toastId = toast.loading('Suppression en cours...', { id: toastId });
        mutate(id);
    }

    return (
        <button onClick={deleteGame}>Supprimer</button>
    )
}
