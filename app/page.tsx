import styles from './page.module.scss';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';
import Register from './login/Register';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <main className={styles.main}>
      <h1>Page d'accueil</h1>
      {!session && <Register />}
      {session && <Link href={'/dashboard'}>Dashboard</Link>}
    </main>
  )
}
