import styles from './page.module.scss';
import Image from "next/image";
import { LootType } from '@/app/types/Cell';

export default function Loot({ loot, rarity }: LootType) {
  return (
    <div className={styles.cell}>
      <Image className={styles.image} src={`/img/${loot}.png`} alt={`${loot} icon by Freepik`} width={512} height={512} />
    </div>
  )
}
