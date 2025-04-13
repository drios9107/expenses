'use client';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import FallbackLoader from './FallbackLoader';
import { policyRoutes, publicRoutes } from '@/utils/helpers';
import { setAuthToken } from '@/utils/AxiosInterceptor';

export default function AuthGuard({ children }) {
    const { data: session, status } = useSession()
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const callbackUrl = useMemo(() => {
        const url = searchParams.get('callbackUrl');
        return url ? decodeURIComponent(url) : '/';
    }, [searchParams]);

    const combinedPublicRoutes = useMemo(() => [...publicRoutes, ...policyRoutes], []);

    useEffect(() => {
        if (status === 'unauthenticated' && pathname !== '/login')
            router.push('/login?callbackUrl=' + encodeURIComponent(pathname));
        else if (status === 'authenticated' && searchParams.has('callbackUrl'))
            router.push(callbackUrl)
        else if (status === 'authenticated')
            router.push('/');
    }, [status, router, pathname, searchParams, callbackUrl]);

    useEffect(() => {
        if (session?.user?.token)
            setAuthToken(session.user.token);
    }, [session?.user?.token]);

    if (status === 'loading')
        return <FallbackLoader />

    if (status === 'authenticated' || combinedPublicRoutes?.includes(pathname))
        return <>{children}</>;

    return null;
}