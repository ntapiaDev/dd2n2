'use client';

import styles from './Nav.module.scss';
import { getSession } from "next-auth/react";
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";
import { UserType } from '../types/User';

const getUser = async () => {
  const session = await getSession();
  return session?.user || null;
}

export default function Nav({ user }: { user: UserType }) {
  const { data } = useQuery({ queryKey: ['user'], queryFn: getUser, initialData: user });

  return (
    <nav className={styles.nav}>
      <Link href='/'>Accueil</Link>
      <Link href='/dashboard'>Tableau de bord</Link>
      {data?.game_id && <>
        <Link href='/encampment'>Campement</Link>
        <Link href='/map'>Carte</Link>
      </>}
    </nav>
  )
}
