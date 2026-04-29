import { useDashboardContext, useRecurrentTransaction } from '@/hooks'
import { Box, Button, Grid2, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import GetStorage from '@/utils/GetStorage'
import MetricCard from './MetricCard'
import MonthNavigator from './MonthNavigator'
import { useFormat } from '@/hooks/useFormat'

const TopSection = ({ t, currentMonth, currentYear, getPreviousMonth, getNextMonth }) => {
	const { runTransactions } = useRecurrentTransaction()
	const { getFromStorage } = GetStorage()
	const { currencyFormat } = useFormat()
	const { biggestIncome = 0, biggestIncomeDate, monthExpenses = 0, monthIncome = 0 } = useDashboardContext()
	const [needToRunRecurrence, setNeedToRunRecurrence] = useState(false)

	useEffect(() => {
		const lastRecurrenceDate = getFromStorage('lastRecurrenceDate')
		if ((lastRecurrenceDate && moment().isAfter(parseInt(lastRecurrenceDate, 10), 'day')) || !lastRecurrenceDate) {
			setNeedToRunRecurrence(true)
		}
	}, [getFromStorage])

	const handleRecurrence = useCallback(async () => {
		const response = await runTransactions()
		if (response) setNeedToRunRecurrence(false)
	}, [runTransactions])

	const biggestIncomeDateLabel = useMemo(
		() => (biggestIncomeDate ? moment(biggestIncomeDate).format('DD/MM/YYYY') : '-'),
		[biggestIncomeDate]
	)

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
				<MetricCard
					accent="#5b7cfa"
					accentBorderMode="left"
					leftSide={
						<>
							<Typography variant="body2">{t('biggestIncome')}</Typography>
							<Typography variant="body2">{t('date')}</Typography>
						</>
					}
					rightSide={
						<>
							<Typography sx={styles.valueBlue}>{currencyFormat(biggestIncome)} $</Typography>
							<Typography sx={styles.valueDark}>{biggestIncomeDateLabel}</Typography>
						</>
					}
				/>
			</Grid2>

			<Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
				<Box sx={styles.monthBlock}>
					<MonthNavigator
						currentMonth={currentMonth}
						currentYear={currentYear}
						getPreviousMonth={getPreviousMonth}
						getNextMonth={getNextMonth}
					/>
					<Button
						variant={needToRunRecurrence ? 'contained' : 'outlined'}
						onClick={handleRecurrence}
						sx={[styles.recurrenceButton, needToRunRecurrence ? styles.recurrenceActive : {}]}
					>
						{t('runRecurrence')}
					</Button>
				</Box>
			</Grid2>

			<Grid2 size={{ xs: 12, lg: 4 }}>
				<MetricCard
					accent="#13b88c"
					accentBorderMode="left"
					leftSide={
						<>
							<Typography variant="body2">{t('expenses')}</Typography>
							<Typography variant="body2">{t('income')}</Typography>
						</>
					}
					rightSide={
						<>
							<Typography sx={styles.valueExpense}>{currencyFormat(monthExpenses)} $</Typography>
							<Typography sx={styles.valueIncome}>{currencyFormat(monthIncome)} $</Typography>
						</>
					}
				/>
			</Grid2>
		</Grid2>
	)
}

export default TopSection

const styles = {
	monthBlock: {
		height: '100%',
		borderRadius: '16px',
		border: '1px solid #b8c8ff',
		background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
		p: '14px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '10px',
		boxShadow: '0 8px 22px rgba(20, 47, 79, 0.09)'
	},
	recurrenceButton: {
		borderRadius: '999px',
		fontWeight: 600,
		textTransform: 'none'
	},
	recurrenceActive: {
		background: 'linear-gradient(90deg, #5b7cfa 0%, #7f53ff 100%)'
	},
	valueBlue: { textAlign: 'right', color: '#2f53d0', fontWeight: 600 },
	valueDark: { textAlign: 'right', color: '#20314f', fontWeight: 500 },
	valueExpense: { textAlign: 'right', color: '#d14343', fontWeight: 600 },
	valueIncome: { textAlign: 'right', color: '#148f69', fontWeight: 600 }
}
