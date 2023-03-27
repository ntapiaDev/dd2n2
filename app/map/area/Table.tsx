'use client';

import styles from './page.module.scss';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { AreaType } from '@/app/types/Area';
import Row from "./Row";

const getArea = async (x: string, y: string) => {
  const response = await axios.get(`/api/area?x=${x}&y=${y}`);
  return response.data;
}

export default function Table({ x, y, area }: { x: string, y: string, area: AreaType }) {
  console.log(x, y);
  
  const { data, error, isLoading } = useQuery(`area-${area.id}`, () => getArea(x, y), { initialData: area });
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
