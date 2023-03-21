'use client';

import styles from './page.module.scss';
import axios from 'axios';
import { useQuery } from 'react-query';
import MapRow from "./MapRow";

const getMap = async () => {
  const response = await axios.get('/api/area/');
  return response.data;
}

export default function Table() {
  const { data, error, isLoading } = useQuery({ queryFn: getMap, queryKey: ['map'] });
  if (error) return <p>Échec du chargement!</p>;
  if (isLoading) return <p>Chargement de la carte...</p>;

  const rows = [];
  const size = 9;
  for (let i = 0; i < data.length; i += size) {
    rows.push(<MapRow key={i} row={data.slice(i, i + size)} />);
  }

  return (
    <table className={styles.table}>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
