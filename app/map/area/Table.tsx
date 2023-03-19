'use client';
import styles from './page.module.scss';
import axios from 'axios';
import { useQuery } from 'react-query';
import Row from "./Row";

const getArea = async () => {
  const response = await axios.get('/api/area/E5');
  return response.data;
}

export default function Table() {
  const { data, error, isLoading } = useQuery({ queryFn: getArea, queryKey: ['area'] });
  if (error) return <p>Échec du chargement!</p>;
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
