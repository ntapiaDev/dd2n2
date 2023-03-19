import styles from './page.module.scss';
import Image from "next/image";
import { ZombieType } from '@/app/types/Cell';

export default function Zombie({ attack, defense }: ZombieType) {
  return (
    <div className={styles.cell}>
      <Image className={styles.image} src={'/img/zombie.png'} alt="Zombie icon by Freepik" width={512} height={512} />
    </div>
  )
}
