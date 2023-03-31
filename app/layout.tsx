import './globals.scss';
import { Session } from 'next-auth';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserType } from '@/app/types/User';
import ClientProviders from './website/ClientProviders';
import Nav from './website/Nav';

export const metadata = {
  title: "Don't Die 2Nite",
  description: "Combien de jours tiendrez-vous ?"
}

export default async function RootLayout({ children, session }: { children: React.ReactNode, session: Session }) {
  //Send to children??
  const user: UserType = (await getServerSession(authOptions))?.user;
  
  return (
    <html lang="fr">
      <body>
        <ClientProviders session={session}>
          <Nav user={user} />
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
