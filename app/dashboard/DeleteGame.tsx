import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function DeleteGame({ id }: { id: number }) {

    let deleteToastID: string;
    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        async (id: number) => await axios.delete('/api/game/', {data: id}),
        {
            onError: (error) => {
                toast.error('Error deleting that post', {id: deleteToastID});
            },
            onSuccess: (data) => {
                toast.success('La partie a bien été supprimée', {id: deleteToastID});
                queryClient.invalidateQueries(['games']);                
            }
        }
    )
    const deleteGame = () => {
        deleteToastID = toast.loading('Suppression en cours', {id: deleteToastID});
        mutate(id);
    }

  return (
    <button onClick={deleteGame}>Supprimer</button>
  )
}
