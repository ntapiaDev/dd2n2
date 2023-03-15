import './globals.scss';
import { Session } from 'next-auth';
import ClientSessionProvider from './website/ClientSessionProvider';
import QueryWrapper from './website/QueryWrapper';
import Nav from './website/Nav';

export const metadata = {
  title: "Don't Die 2Nite",
  description: "Combien de jours tiendrez-vous ?"
}

export default function RootLayout({ children, session }: { children: React.ReactNode, session: Session }) {
  return (
    <html lang="fr">
      <body>
        <ClientSessionProvider session={session}>
          <QueryWrapper> {/* Toaster */}
            <Nav />
            {children}
          </QueryWrapper>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
