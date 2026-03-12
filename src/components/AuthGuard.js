'use client'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'
import FallbackLoader from './FallbackLoader'
import {
	combinedPublicRoutes,
	completeAdminRoutes,
	policyRoutes,
	policyRoutesWithLanguage,
	publicRoutes
} from '@/utils/helpers'
import { setAuthToken } from '@/utils/AxiosInterceptor'
import { useToast } from '@/hooks/useToast'
import { useTranslation } from '@/hooks/useTranslation'

export default function AuthGuard({ children, params }) {
	const { data: session, status } = useSession()
	const { toastError } = useToast()
	const { t } = useTranslation(params?.lng, 'login')

	const searchParams = useSearchParams()
	const error = searchParams.get('error')
	const lastErrorRef = useRef()

	const router = useRouter()
	const pathname = usePathname()
	const { lng } = useParams()

	const callbackUrl = useMemo(() => {
		const url = searchParams.get('callbackUrl')
		return url ? decodeURIComponent(url) : `/${lng}`
	}, [lng, searchParams])

	const pathIsStrictLogin = useMemo(() => pathname === `/${lng}/login`, [lng, pathname])
	const pathIsLandingPage = useMemo(() => pathname === `/${lng}`, [lng, pathname])
	const pathIsContactPage = useMemo(() => pathname === `/${lng}/contact`, [lng, pathname])
	const pathIsPoliciesPage = useMemo(() => policyRoutesWithLanguage.includes(pathname), [pathname])

	useEffect(() => {
		if (!error) {
			lastErrorRef.current = null
		} else if (error !== lastErrorRef.current) {
			const loginError = t('login.login_error')
			const tryVpn = t('login.try_vpn')

			if (loginError === 'login.login_error') return

			if (error === 'OAuthCallback') {
				toastError(`${loginError} ${error}. ${tryVpn}`)
			} else {
				toastError(`${loginError} ${error}`)
			}
			lastErrorRef.current = error
		}
	}, [error, t, toastError])

	useEffect(() => {
		if (!pathIsLandingPage && !pathIsContactPage && !pathIsPoliciesPage) {
			if (status === 'unauthenticated' && publicRoutes)
				router.push(`/${lng}/login?callbackUrl=${encodeURIComponent(pathname)}`)
			else if (status === 'authenticated' && searchParams.has('callbackUrl')) router.push(callbackUrl)
			else if (status === 'authenticated' && pathIsStrictLogin) router.push(`/${lng}`)
		}
	}, [
		callbackUrl,
		lng,
		pathIsContactPage,
		pathIsLandingPage,
		pathIsPoliciesPage,
		pathIsStrictLogin,
		pathname,
		router,
		searchParams,
		status
	])

	useEffect(() => {
		if (session?.user?.token) setAuthToken(session.user.token)
	}, [session?.user?.token])

	if (status === 'loading') return <FallbackLoader />

	if (status === 'authenticated' && session?.user?.role !== 'Admin' && completeAdminRoutes?.includes(pathname)) {
		router.push(`/${lng}/dashboard`)
		return <FallbackLoader />
	}

	if (status === 'authenticated' || combinedPublicRoutes?.includes(pathname)) return <>{children}</>

	return null
}
