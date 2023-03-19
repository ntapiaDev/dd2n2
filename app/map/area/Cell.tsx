import styles from './page.module.scss';
import { CellType } from '@/app/types/Cell';
import Loot from './Loot';
import Player from './Player';
import Zombie from './Zombie';

export default function Cell({ cell }: { cell: CellType }) {

  return (
    <td className={styles.td}>{
      cell.x === 5 && cell.y === 5 ? <Player /> :
      cell.loot ? <Loot loot={cell.loot.loot} rarity={cell.loot.rarity} /> :
      cell.zombie ? <Zombie attack={cell.zombie.attack} defense={cell.zombie.defense} /> : ''
    }</td>
  )
}
