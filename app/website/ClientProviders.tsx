'use client';

import React, { ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: ReactNode;
  session: Session;
}

export default function ClientProviders({ children, session }: Props) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={{ className: 'toaster' }} />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
