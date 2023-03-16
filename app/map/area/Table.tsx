import axios from 'axios';
import styles from './page.module.scss';
import Row from "./Row";

export default async function Table() {
  let size = 9;
  // let table = [];
  // for (let i = 0; i < size * size; i++) {
  //   let zombie = Math.random() > 0.95 ? {
  //     attack: Math.floor(Math.random() * 10),
  //     defense: Math.floor(Math.random() * 10)
  //   } : null;
  //   let cell = {
  //     id: i,
  //     zombie
  //   }
  //   table.push(cell);
  // }
  const response = await axios.get('http://localhost:3000/api/area');
  const table = response.data[0].cells;

  const rows = [];
  for (let i = 0; i < table.length; i += size) {
    rows.push(<Row key={i} values={table.slice(i, i + size)} />);
  }

  return (
    <table className={styles.table}>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
