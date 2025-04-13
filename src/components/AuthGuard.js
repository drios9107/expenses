'use client';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FallbackLoader from './FallbackLoader';
import { policyRoutes, publicRoutes } from '@/utils/helpers';
import { setAuthToken } from '@/utils/AxiosInterceptor';

export default function AuthGuard({ children }) {
    const { data: session, status } = useSession()
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'unauthenticated' && pathname !== '/login')
            router.push('/login?callbackUrl=' + encodeURIComponent(pathname));
        else if (status === 'authenticated' && pathname.includes('callbackUrl='))
            router.push(pathname?.split('callbackUrl=')?.[1])
        else if (status === 'authenticated')
            router.push('/');
    }, [status, router, pathname]);

    useEffect(() => {
        if (session?.user?.token)
            setAuthToken(session.user.token);
    }, [session?.user?.token]);

    if (status === 'loading')
        return <FallbackLoader />

    if (status === 'authenticated' || [...publicRoutes, ...policyRoutes]?.includes(pathname))
        return <>{children}</>;

    return null;
}