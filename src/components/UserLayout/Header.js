import { Box, Paper, Tooltip, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import Balance from '../Balance'
import { Home, Logout, Policy } from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSelector from '../LanguageSelector'

const Header = () => {
	const { conditionalTopSectionStyles } = useLayoutStyles()
	const isMobile = useMediaQuery('@media (max-width:500px)')
	const { lng } = useParams()
	const { t } = useTranslation(lng ?? 'en', 'common')

	const handleSignOut = useCallback(() => {
		signOut()
	}, [])

	const getHomeLink = useMemo(() => {
		const icon = <Home sx={styles.iconMenu} />
		const title = t('home')

		return (
			<Link href={`/${lng}/dashboard`} className="landing-page-link" style={styles.link}>
				{isMobile ? (
					<Tooltip title={title}>{icon}</Tooltip>
				) : (
					<>
						{icon} {title}
					</>
				)}
			</Link>
		)
	}, [isMobile, lng, t])

	const getPrivacyLink = useMemo(() => {
		const icon = <Policy sx={styles.iconMenu} />
		const title = t('privacyPolicy')

		return (
			<Link href={`/${lng}/privacy`} className="landing-page-link" style={styles.link}>
				{isMobile ? (
					<Tooltip title={title}>{icon}</Tooltip>
				) : (
					<>
						{icon} {title}
					</>
				)}
			</Link>
		)
	}, [isMobile, lng, t])

	return (
		<Paper sx={[styles.topSection, conditionalTopSectionStyles]}>
			<Box sx={[{ display: 'flex', flexDirection: 'row', gap: '10px' }]}>
				{getHomeLink}
				{getPrivacyLink}
			</Box>
			<Box sx={styles.rightSection}>
				<LanguageSelector />
				<Balance />
				<Box sx={[{ cursor: 'pointer', display: 'flex', alignItems: 'center' }]}>
					<Tooltip title={t('singOut')}>
						<Logout sx={[styles.opacity, styles.iconMenu]} onClick={handleSignOut} />
					</Tooltip>
				</Box>
			</Box>
		</Paper>
	)
}

export default Header

const styles = {
	topSection: {
		backgroundColor: '#fff',
		minHeight: '60px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	opacity: { '& :hover': { opacity: 0.7 } },
	iconMenu: { color: '#00000099', height: '20px', width: '20px' },
	link: { display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' },
	rightSection: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }
}
