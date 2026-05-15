'use client'
import { useTranslation } from '@/hooks/useTranslation'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const TermsOfService = ({ params }) => {
	const { t } = useTranslation(params?.lng ?? 'en', 'terms')
	const { back } = useRouter()

	const sections = [
		'acceptance',
		'description',
		'userAccounts',
		'userResponsibilities',
		'prohibitedActivities',
		'intellectualProperty',
		'limitationOfLiability',
		'disclaimer',
		'termination',
		'governingLaw',
		'changes',
		'contact'
	]

	return (
		<Paper sx={styles.container}>
			<Box sx={styles.header}>
				<Typography variant="h5" sx={styles.title}>
					{t('title')}
				</Typography>
				<Typography variant="body2" sx={styles.updatedAt}>
					{t('lastUpdated')}
				</Typography>
			</Box>
			<Divider />
			<Box sx={styles.sectionsContainer}>
				{sections.map(section => (
					<Box key={section} sx={styles.section}>
						<Typography variant="subtitle1" sx={styles.sectionTitle}>
							{t(`${section}.title`)}
						</Typography>
						<Typography variant="body2" sx={styles.sectionText}>
							{t(`${section}.text`)}
						</Typography>
					</Box>
				))}
			</Box>
			<Button variant="contained" onClick={() => back()} size="small">
				{t('button')}
			</Button>
		</Paper>
	)
}

export default TermsOfService

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: 'min(860px, 100%)',
		backgroundColor: '#fff',
		boxShadow: '2px 2px 10px #4D4D4D33',
		borderRadius: '16px',
		gap: '14px',
		p: { xs: '16px', sm: '24px' },
		maxHeight: { xs: 'calc(100vh - 32px)', sm: 'none' },
		overflow: 'auto'
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: '4px'
	},
	title: {
		fontWeight: 600
	},
	updatedAt: {
		color: '#6b7280'
	},
	sectionsContainer: {
		display: 'flex',
		flexDirection: 'column',
		gap: '16px'
	},
	section: {
		display: 'flex',
		flexDirection: 'column',
		gap: '4px'
	},
	sectionTitle: {
		fontWeight: 600
	},
	sectionText: {
		textAlign: 'justify'
	}
}
