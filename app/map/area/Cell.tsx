import styles from './page.module.scss';
import Zombie from './Zombie';
import { CellType } from '@/app/types/Cell';

export default function Cell({ cell }: { cell: CellType }) {

  return (
    <td className={styles.td}>{
      cell.x === 5 && cell.y === 5 ? 'P' :
      cell.loot ? 'L' :
      cell.zombie ? <Zombie /> : ''
    }</td>
  )
}
