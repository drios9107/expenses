import { Box, Paper, Tooltip, useMediaQuery } from '@mui/material'
import { useCallback } from 'react'
import Balance from '../Balance'
import { Dashboard, Home, Logout, Policy } from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSelector from '../LanguageSelector'
import HeaderLink from '../HeaderLink'

const Header = () => {
	const { conditionalTopSectionStyles } = useLayoutStyles()
	const isMobile = useMediaQuery('@media (max-width:500px)')
	const { lng } = useParams()
	const { t } = useTranslation(lng ?? 'en', 'common')

	const handleSignOut = useCallback(() => {
		signOut()
	}, [])

	return (
		<Paper sx={[styles.topSection, conditionalTopSectionStyles]}>
			<Box sx={styles.leftSection}>
				<HeaderLink page={''} title={t('home')}>
					<Home sx={styles.iconMenu} />
				</HeaderLink>
				<HeaderLink page={'dashboard'} title={'Dashboard'}>
					<Dashboard sx={styles.icon} />
				</HeaderLink>
				<HeaderLink page={'privacy'} title={t('privacyPolicy')}>
					<Policy sx={styles.icon} />
				</HeaderLink>
			</Box>
			<Box sx={styles.rightSection}>
				<LanguageSelector />
				<Balance />
				<Box sx={styles.signOutWrap}>
					<Tooltip title={t('singOut')}>
						<Logout sx={styles.iconMenu} onClick={handleSignOut} />
					</Tooltip>
				</Box>
			</Box>
		</Paper>
	)
}

export default Header

const styles = {
	topSection: {
		minHeight: '60px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		background: 'linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%)',
		border: '1px solid #d6e2ff',
		boxShadow: '0 10px 22px rgba(20, 47, 79, 0.08)'
	},
	iconMenu: {
		color: '#3f5f9b',
		height: '20px',
		width: '20px',
		cursor: 'pointer'
	},
	leftSection: {
		display: 'flex',
		flexDirection: 'row',
		gap: '10px',
		alignItems: 'center'
	},
	rightSection: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '10px'
	},
	signOutWrap: {
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		'&:hover': { opacity: 0.75 }
	}
}
