import styles from './page.module.scss';
import Image from "next/image";

export default function Player() {
  return (
    <div className={styles.cell}>
      <Image className={styles.image} src={'/img/human.png'} alt="Human icon by Freepik" width={512} height={512} />
    </div>
  )
}
