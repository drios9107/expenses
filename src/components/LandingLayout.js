'use client'
import { useTranslation } from '@/hooks/useTranslation'
import { Box, Button, Typography } from '@mui/material'
import banner from '@/assets/banner3.jpg'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LanguageSelector from './LanguageSelector'

export default function LandingLayout({ children }) {
	const { status } = useSession()
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', 'landing')
	const lng = useMemo(() => params?.lng ?? 'en', [params?.lng])
	const router = useRouter()

	const isInvalidRoute = useMemo(() => !params.lng || !['en', 'es'].includes(params?.lng), [params?.lng])

	useEffect(() => {
		if (isInvalidRoute) return router.replace('/en')
	}, [isInvalidRoute, router])

	if (isInvalidRoute) return null

	return (
		<Box sx={styles.container}>
			<Box sx={styles.banner}>
				<Box sx={styles.menu}>
					<Box sx={styles.leftMenu}>
						<Link href={`/${lng}/`} style={styles.link}>
							Expenses
						</Link>
					</Box>

					<Box sx={styles.rightMenu}>
						<LanguageSelector controllerExtraclasses={{ width: 'fit-content' }} />
						{status === 'authenticated' ? (
							<Link href={`/${lng}/dashboard`} style={styles.link}>
								{t('dashboard')}
							</Link>
						) : (
							<Link href={`/${lng}/login`} style={styles.link}>
								{t('login')}
							</Link>
						)}

						<Link href={`/${lng}/contact`} style={styles.link}>
							{t('contactMe')}
						</Link>
					</Box>
				</Box>
				<Box sx={styles.titleContainer}>
					<Typography variant="h4" color="#fff">
						{t('title')}
					</Typography>
					<Typography variant="h5" color="#fff">
						{t('subtitle')}
					</Typography>
				</Box>

				{status !== 'authenticated' && (
					<Button variant="contained" onClick={() => router.push(`/${params?.lng}/login`)} sx={styles.button}>
						{t('loginNow')}
					</Button>
				)}
			</Box>

			{children}

			<Box sx={styles.footer}>
				<Typography variant="body2" color="#fff">
					&copy; {new Date().getFullYear()} Expenses. {t('allRightsReserved')}
				</Typography>
				<Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
					<Link href={`/${lng}/privacy`} variant="body2" underline="hover">
						{t('privacyPolicy')}
					</Link>
					<Link href={`/terms`} variant="body2" underline="hover">
						{t('termsOfService')}
					</Link>
					<Link href={`/cookies`} variant="body2" underline="hover">
						{t('cookiePolicy')}
					</Link>
				</Box>
			</Box>
		</Box>
	)
}

const styles = {
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '50px'
	},
	menu: { px: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
	leftMenu: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '15px' },
	rightMenu: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' },
	banner: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '100px',
		backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)), url(${banner.src})`,
		backgroundSize: 'cover',
		width: '100%',
		py: '50px'
	},
	titleContainer: {
		textAlign: 'center',
		userSelect: 'none',
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '50px',
		'& > h4, & > h5': { textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }
	},
	button: { width: 'fit-content', borderRadius: '16px' },
	footer: {
		backgroundColor: '#02aba8',
		height: '100px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: '#fff',
		px: '50px'
	},

	link: {
		display: 'flex',
		flexDirection: 'row',
		gap: '5px',
		alignItems: 'center',
		color: '#fff',
		cursor: 'pointer',
		'&:hover': { opacity: 0.7 }
	}
}
