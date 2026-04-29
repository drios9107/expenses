import { Grid2, Typography } from '@mui/material'
import MetricCard from './MetricCard'

const DebtSection = ({ personsDebt = [] }) => {
	return (
		<Grid2 container spacing={2}>
			{personsDebt.map(item => (
				<Grid2 key={item?.person?._id} size={{ xs: 12, md: 6, lg: 4 }}>
					<MetricCard
						title={item?.person?.name}
						accent="#ff8a4c"
						leftSide={Object.keys(item?.debts || {}).map(debtName => (
							<Typography key={debtName} variant="body2">
								{debtName}
							</Typography>
						))}
						rightSide={Object.values(item?.debts || {}).map(amount => (
							<Typography key={amount} variant="body2" sx={styles.amount}>
								{amount} $
							</Typography>
						))}
					/>
				</Grid2>
			))}
		</Grid2>
	)
}

export default DebtSection

const styles = {
	amount: {
		textAlign: 'right',
		fontWeight: 700,
		color: '#8b3f15'
	}
}
