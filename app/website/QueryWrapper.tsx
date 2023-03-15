'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

interface Props {
    children?: ReactNode
}

const queryClient = new QueryClient;

const QueryWrapper = ({ children }: Props) => (
    <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={{ className: 'toaster' }} />
        {children}
    </QueryClientProvider>
);

export default QueryWrapper;
