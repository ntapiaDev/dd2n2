import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LeaveGame({ id }: { id: number }) {

    let deleteToastID: string;
    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        async (game_id: number) => await axios.patch('/api/user/leaveGame/', { game_id }),
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
    const LeaveGame = () => {
        deleteToastID = toast.loading('Suppression en cours', {id: deleteToastID});
        mutate(id);
    }

  return (
    <button onClick={LeaveGame}>Quitter la partie</button>
  )
}
