import styles from './page.module.scss';
import { AreaType } from '@/app/types/Area';
import Link from 'next/link';

export default function Cell({ area }: { area: AreaType }) {

  return (
    <td className={styles.td} style={{
      backgroundColor:
        area.biome === 'CITY' ? '#A9A9A9' :
        area.biome === 'DESERT' ? '#F5DEB3' :
        area.biome === 'FOREST' ? '#228B22' :
        area.biome === 'LAKE' ? '#1E90FF' : '#8B0000'
    }}>
      {/* <div style={{
        width: '100%',
        height: '100%',
        border: '3px double',
        borderColor:
          area.level === 0 ? 'white' :
          area.level === 1 ? 'blue' :
          area.level === 2 ? 'green' :
          area.level === 3 ? 'yellow' :
          area.level === 4 ? 'red' : 'purple'
      }}> */}
        <Link href={`map/area/${area.x}/${area.y}`}>{
        area.biome.slice(0, 1)
        // area.level
      }</Link>
      {/* </div> */}
    </td>
  )
}
