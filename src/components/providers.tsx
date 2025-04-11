'use client'

import { SessionProvider, getSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

interface ProvidersProps {
    readonly children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [token, setToken] = useState<string | null>(null);

    // Fetch session and extract token if needed
    useEffect(() => {
        const fetchToken = async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const session: any = await getSession();
            if (session?.token) {
                setToken(((session as unknown) as { token: string }).token);
            }
        };

        fetchToken();
    }, []);

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default Providers;