'use client';

import styles from './page.module.scss';
import axios, { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Row from "./Row";

const getArea = async (x: string, y: string) => {
  const response = await axios.get(`/api/area?x=${x}&y=${y}`);
  return response.data;
}

export default function Table() {
  const searchParams = useSearchParams();
  const x = searchParams?.get('x');
  const y = searchParams?.get('y');
  if (!x || !y || parseInt(x) < 1 || parseInt(x) > 9 || parseInt(y) < 1 || parseInt(y) > 9) return <p>Cette zone est invalide...</p>;

  const queryClient = useQueryClient();
  const [generated, setGenerated] = useState(false);
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
        queryClient.invalidateQueries(`area-${x}-${y}`);
      },
    }
  )

  const { data, error, isLoading } = useQuery(`area-${x}-${y}`, () => getArea(x, y));
  if (error && error instanceof AxiosError) return <p>{error.response?.data}</p>;
  if (isLoading) return <p>Chargement de la zone...</p>;

  if (!data.cells.length && !generated) {
    setGenerated(true);
    toastId = toast.loading("Préparation de la partie...");
    mutate(data);
  } 

  const table = data.cells;
  const rows = [];
  const size = 9;
  for (let i = 0; i < table.length; i += size) {
    rows.push(<Row key={i} row={table.slice(i, i + size)} />);
  }

  return (
    <table className={styles.table}>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
