'use client';

import styles from './page.module.scss';
import axios, { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
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

  const { data, error, isLoading } = useQuery({ queryKey: [`area-${x}-${y}`], queryFn: () => getArea(x, y) });
  if (error && error instanceof AxiosError) return <p>{error.response?.data}</p>;
  if (isLoading) return <p>Chargement de la zone...</p>;

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
