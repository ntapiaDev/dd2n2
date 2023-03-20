'use client';

import styles from './page.module.scss';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Register from './login/Register';

export default function Home() {
  const { data: session, status } = useSession();
  
  return (
    <main className={styles.main}>
      <h1>Page d'accueil</h1>
      {status === "loading" ?
        <p>Chargement...</p> :
        !session?.user ? 
          <Register /> :
          <Link href={'/dashboard'}>Dashboard</Link>}
    </main>
  )
}
