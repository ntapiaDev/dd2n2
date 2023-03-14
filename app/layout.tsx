import './globals.scss';
import QueryWrapper from './QueryWrapper';

export const metadata = {
  title: "Don't Die 2Nite",
  description: "Combien de jours tiendrez-vous ?"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <QueryWrapper>
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
