'use client';

import styles from './Nav.module.scss';
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const session = useSession();

  return (
    <nav className={styles.nav}>
      <Link href='/'>Accueil</Link>
      <Link href='/dashboard'>Tableau de bord</Link>
      <Link href='/encampment'>Campement</Link>
      <Link href='/map'>Carte</Link>
    </nav>
  )
}
