import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddGame() {
    const queryClient = useQueryClient();
    let toastPostID: string;

    const { mutate } = useMutation(
        async () => await axios.post('api/game/', {}), {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
            },
            onSuccess: () => {
                toast.success("Partie ajoutée 🔥", { id: toastPostID });
                // CF gestion des états pour ajouter directement en cache
                queryClient.invalidateQueries(["games"]);
            }
        }
    )

    const addGame = async (e: React.FormEvent) => {
        e.preventDefault();
        toastPostID = toast.loading("Creating your post", { id: toastPostID });
        mutate();
    }

    return (
        <form onSubmit={addGame}>
            <button>Ajouter une partie</button>
        </form>
    )
}
