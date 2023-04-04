import './globals.scss';
import { Session } from 'next-auth';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserType } from '@/app/types/User';
import ClientProviders from './website/ClientProviders';
import Nav from './website/Nav';
import getQueryClient from './website/getQueryClient';

export const metadata = {
  title: "Don't Die 2Nite",
  description: "Combien de jours tiendrez-vous ?"
}

const getUser = async (): Promise<UserType> => {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export default async function RootLayout({ children, session }: { children: React.ReactNode, session: Session }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUser });
  const dehydratedState = dehydrate(queryClient);
  
  return (
    <html lang="fr">
      <body>
        <ClientProviders session={session}>
          <Hydrate state={dehydratedState}>
            <Nav />
            {children}
          </Hydrate>
        </ClientProviders>
      </body>
    </html>
  )
}
