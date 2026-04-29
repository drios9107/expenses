import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import { Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useMemo } from 'react'

const Footer = () => {
	const { conditionalFooterSectionStyles } = useLayoutStyles()
	const year = useMemo(() => moment().year(), [])

	return (
		<Paper sx={[styles.footerSection, conditionalFooterSectionStyles]}>
			<Typography variant="body2" sx={styles.text}>
				Copyright © {year} Expenses
			</Typography>
		</Paper>
	)
}

export default Footer

const styles = {
	footerSection: {
		minHeight: '56px',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderBottomRightRadius: 0,
		borderBottomLeftRadius: 0,
		background: 'linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%)',
		border: '1px solid #d6e2ff',
		boxShadow: '0 -4px 16px rgba(20, 47, 79, 0.06)'
	},
	text: {
		userSelect: 'none',
		color: '#4d658f',
		fontWeight: 500
	}
}
