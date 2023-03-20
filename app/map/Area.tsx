import styles from './page.module.scss';
import { AreaType } from '@/app/types/Area';
import Link from 'next/link';

export default function Cell({ area }: { area: AreaType }) {

  return (
    <td className={styles.td}>
      <Link href={`map/area/${area.x}/${area.y}`}>{
      area.x + '' + area.y
    }</Link></td>
  )
}
