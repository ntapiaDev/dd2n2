import './globals.scss';
import { Session } from 'next-auth';
import ClientProviders from './website/ClientProviders';
import Nav from './website/Nav';

export const metadata = {
  title: "Don't Die 2Nite",
  description: "Combien de jours tiendrez-vous ?"
}

export default function RootLayout({ children, session }: { children: React.ReactNode, session: Session }) {
  return (
    <html lang="fr">
      <body>
        <ClientProviders session={session}> {/* Toaster */}
          <Nav />
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
