'use client'
import { ListProvider } from '@/contexts/ListContext'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { es } from 'date-fns/locale'
import { DashboardProvider } from '@/contexts/DashboardContext'
import NextTopLoader from 'nextjs-toploader'
import Layout from './UserLayout/Layout'
import { SessionProvider } from 'next-auth/react'
import CookieConsentBanner from './CookieConsentBanner'
import AuthGuard from './AuthGuard'
import InDevelopmentBadge from './InDevelopmentBadge'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const App = ({ children }) => {
	const pathname = usePathname()

	const isOnlyTop = useMemo(() => ['/', '/en', '/es'].includes(pathname), [pathname])

	return (
		<SessionProvider>
			<InDevelopmentBadge isOnlyTop={!isOnlyTop} />
			<AuthGuard>
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
					<DashboardProvider>
						<ListProvider>
							<NextTopLoader showSpinner={false} />
							<CookieConsentBanner />
							<Layout>{children}</Layout>
						</ListProvider>
					</DashboardProvider>
				</LocalizationProvider>
			</AuthGuard>
		</SessionProvider>
	)
}

export default App
