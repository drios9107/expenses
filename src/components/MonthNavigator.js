import { useTranslation } from '@/hooks/useTranslation'
import { ArrowLeftRounded, ArrowRightRounded } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useParams } from 'next/navigation'

const months = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december'
]

const MonthNavigator = ({ currentMonth, currentYear, getPreviousMonth = () => {}, getNextMonth = () => {} }) => {
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')

	return (
		<Box sx={styles.container}>
			<IconButton sx={styles.iconButton} onClick={getPreviousMonth}>
				<ArrowLeftRounded />
			</IconButton>
			<Typography sx={styles.text}>
				{t(`months.${months[currentMonth]}`)} {currentYear}
			</Typography>
			<IconButton sx={styles.iconButton} onClick={getNextMonth}>
				<ArrowRightRounded />
			</IconButton>
		</Box>
	)
}

export default MonthNavigator

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '4px',
		borderRadius: '999px',
		backgroundColor: '#ecf2ff',
		px: '8px',
		py: '4px'
	},
	iconButton: {
		color: '#3457cc'
	},
	text: {
		userSelect: 'none',
		color: '#1f3154',
		fontWeight: 500,
		minWidth: '170px',
		textAlign: 'center'
	}
}
