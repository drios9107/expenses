import { Chart as ChartJS, CategoryScale, registerables } from 'chart.js'
import { useCallback, useMemo, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useDashboardContext, useTransaction } from '@/hooks'
import { Typography } from '@mui/material'
import Loader from '../Loader'
import GraphTransactionsModal from '../GraphTransactionsModal'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import ChartContainer from '../ChartContainer'
ChartJS.register(...registerables, CategoryScale)

const DashboardPieGraph = ({ currentMonth, currentYear }) => {
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')
	const { categoryLabels, categoryValues } = useDashboardContext()
	const [monthTransactions, setMonthTransactions] = useState([])
	const { getTransactionsByCategory, isLoading } = useTransaction()

	const onClick = useCallback(
		async (e, v) => {
			const category = categoryLabels[v?.[0]?.index]
			if (category) {
				const response = await getTransactionsByCategory(category, currentMonth, currentYear)
				if (response) setMonthTransactions(response)
			}
		},
		[categoryLabels, getTransactionsByCategory, currentMonth, currentYear]
	)

	const data = useMemo(
		() => ({
			labels: categoryLabels,
			datasets: [
				{
					data: categoryValues,
					backgroundColor: categoryValues.map(i => `#${Math.random().toString(16).slice(-6)}`),
					borderWidth: 0
				}
			]
		}),
		[categoryValues, categoryLabels]
	)

	const options = useMemo(
		() => ({
			maintainAspectRatio: false,
			responsive: true,
			onClick,
			plugins: {
				title: {
					text: t('graphPieTitle'),
					display: false
				},
				legend: {
					display: true,
					position: 'right'
				}
			}
		}),
		[onClick, t]
	)

	if (categoryValues.length === 0)
		return (
			<Typography variant="subtitle2" sx={{ userSelect: 'none' }}>
				{t('noData')}
			</Typography>
		)

	return (
		<ChartContainer>
			{isLoading && <Loader isLoading />}
			{monthTransactions.length > 0 && (
				<GraphTransactionsModal
					title={monthTransactions?.[0]?.category}
					transactions={monthTransactions}
					onClose={() => setMonthTransactions([])}
				/>
			)}
			<Doughnut data={data} options={options} />
		</ChartContainer>
	)
}

export default DashboardPieGraph
