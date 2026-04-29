import { useFormat } from '@/hooks/useFormat'
import { Grid2, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useCallback, useMemo, useState } from 'react'
import DayCardModal from '@/components/DayCardModal'

const DayCard = ({ title, day, getDashboard = () => {} }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isHover, setIsHover] = useState(false)
	const { currencyFormat } = useFormat()

	const total = useMemo(() => {
		let sum = 0
		day.forEach(item => {
			sum += item?.amount
		})
		return sum
	}, [day])

	const onClose = useCallback(
		shouldUpdate => {
			if (shouldUpdate) getDashboard()
			setIsOpen(false)
		},
		[getDashboard]
	)

	const highSpend = total >= 4000

	return (
		<>
			<Grid2 size={{ lg: 3, md: 6, xs: 12 }}>
				<Paper
					sx={[styles.card, highSpend ? styles.highSpend : {}, isHover ? styles.hover : {}]}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					onClick={() => setIsOpen(true)}
				>
					<Typography sx={styles.day}>{moment(title).format('dddd DD')}</Typography>
					<Typography sx={styles.total}>{currencyFormat(total)} $</Typography>
				</Paper>
			</Grid2>
			{isOpen && <DayCardModal onClose={onClose} title={title} day={day} />}
		</>
	)
}

export default DayCard

const styles = {
	card: {
		p: '14px',
		borderRadius: '16px',
		border: '1px solid #d6e2ff',
		boxShadow: '0 8px 20px rgba(20, 47, 79, 0.08)',
		cursor: 'pointer',
		backgroundColor: '#ffffff',
		transition: 'all 0.2s ease'
	},
	hover: {
		transform: 'translateY(-2px)'
	},
	highSpend: {
		borderColor: '#ffb4a3',
		backgroundColor: '#fff2ef'
	},
	day: {
		userSelect: 'none',
		color: '#3f5478',
		fontWeight: 500
	},
	total: {
		textAlign: 'right',
		color: '#1f3154',
		fontWeight: 600
	}
}
