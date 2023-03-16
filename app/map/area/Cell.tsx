import styles from './page.module.scss';
import Zombie from './Zombie';

export default function Cell({ value }) {

  return (
    <td className={styles.td}>{
      value.x === 5 && value.y === 5 ? 'P' :
      value.loot ? 'L' :
      value.zombie ? <Zombie /> : ''
    }</td>
  )
}
