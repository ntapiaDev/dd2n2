'use client';
import styles from './page.module.scss';
import axios, { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from "react-hot-toast";
import Row from "./Row";

const getArea = async (x: string, y: string) => {
  const response = await axios.get(`/api/area?x=${x}&y=${y}`);
  return response.data;
}

export default function Table() {
  const searchParams = useSearchParams();
  const x = searchParams?.get('x');
  const y = searchParams?.get('y');
  if (!x || !y) return <p>Cette zone est invalide.</p>

  const queryClient = useQueryClient();
  let toastId: string;

  const { mutate } = useMutation(
    async (data: {id: number, biome: String, level: number}) => await axios.post('/api/cell/', {
      id: data.id,
      biome: data.biome,
      level: data.level
    }), {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { id: toastId })
        }
      },
      onSuccess: async (data) => {
        toast.success("Zone créée 🔥", { id: toastId });
        // CF gestion des états pour ajouter directement en cache
        queryClient.invalidateQueries(["area"]);
      },
    }
  )

  const { data, error, isLoading } = useQuery({ queryFn: () => getArea(x, y), queryKey: ['area'] });
  if (error) return <p>Échec du chargement!</p>;
  if (isLoading) return <p>Chargement de la zone...</p>;

  const generate = () => {
    toastId = toast.loading("Création d'une partie...", { id: toastId });
    mutate(data)
  }

  const table = data.cells;

  const rows = [];
  const size = 9;
  for (let i = 0; i < table.length; i += size) {
    rows.push(<Row key={i} row={table.slice(i, i + size)} />);
  }

  return (
    <>
      {!table.length && <button onClick={generate}>Générer la zone</button>}
      <table className={styles.table}>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  )
}
