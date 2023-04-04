'use client';

import styles from './Nav.module.scss';
import useUser from "@/app/hooks/useUser";
import Link from "next/link";

export default function Nav() {
  const user = useUser();
  return (
    <nav className={styles.nav}>
      <Link href='/'>Accueil</Link>
      <Link href='/dashboard'>Tableau de bord</Link>
      {user?.game_id && <>
        <Link href='/encampment'>Campement</Link>
        <Link href='/map'>Carte</Link>
      </>}
    </nav>
  )
}
