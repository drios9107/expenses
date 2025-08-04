'use client';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import FallbackLoader from './FallbackLoader';
import { combinedPublicRoutes, completeAdminRoutes, policyRoutes, policyRoutesWithLanguage, publicRoutes } from '@/utils/helpers';
import { setAuthToken } from '@/utils/AxiosInterceptor';

export default function AuthGuard({ children, params }) {
    const { data: session, status } = useSession()

    const router = useRouter();
    const pathname = usePathname();
    const { lng } = useParams()
    const searchParams = useSearchParams();

    const callbackUrl = useMemo(() => {
        const url = searchParams.get('callbackUrl');
        return url ? decodeURIComponent(url) : `/${lng}`;
    }, [lng, searchParams]);

    const pathIsStrictLogin = useMemo(() => pathname === `/${lng}/login`, [lng, pathname])
    const pathIsLandingPage = useMemo(() => pathname === `/${lng}`, [lng, pathname])
    const pathIsContactPage = useMemo(() => pathname === `/${lng}/contact`, [lng, pathname])
    const pathIsPoliciesPage = useMemo(() => policyRoutesWithLanguage.includes(pathname), [pathname])

    useEffect(() => {
        if (!pathIsLandingPage && !pathIsContactPage && !pathIsPoliciesPage) {
            if (status === 'unauthenticated' && publicRoutes)
                router.push(`/${lng}/login?callbackUrl=${encodeURIComponent(pathname)}`);
            else if (status === 'authenticated' && searchParams.has('callbackUrl'))
                router.push(callbackUrl)
            else if (status === 'authenticated' && pathIsStrictLogin)
                router.push(`/${lng}`);
        }
    }, [callbackUrl, lng, pathIsContactPage, pathIsLandingPage, pathIsPoliciesPage, pathIsStrictLogin, pathname, router, searchParams, status]);

    useEffect(() => {
        if (session?.user?.token)
            setAuthToken(session.user.token);
    }, [session?.user?.token]);

    if (status === 'loading')
        return <FallbackLoader />

    if (status === 'authenticated' && session?.user?.role !== 'Admin' && completeAdminRoutes?.includes(pathname)) {
        router.push(`/${lng}/dashboard`)
        return <FallbackLoader />
    }

    if (status === 'authenticated' || combinedPublicRoutes?.includes(pathname))
        return <>{children}</>;

    return null;
}