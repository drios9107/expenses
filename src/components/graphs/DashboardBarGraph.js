import { useCallback, useMemo, useState } from 'react'
import { Chart as ChartJS, CategoryScale, registerables } from 'chart.js'
import { useDashboardContext, useTransaction } from '@/hooks'
import { Typography } from '@mui/material'
import Loader from '../Loader'
import GraphTransactionsModal from '../GraphTransactionsModal'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import ChartContainer from '../ChartContainer'
import { Bar } from 'react-chartjs-2'
ChartJS.register(...registerables, CategoryScale)

const DashboardBarGraph = ({ currentMonth, currentYear }) => {
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')
	const { subCategoryLabels, subCategoryValues } = useDashboardContext()
	const [monthTransactions, setMonthTransactions] = useState([])
	const { getTransactionsByCategoryAndSubCategory, isLoading } = useTransaction()

	const getSplittedSubCategoryLabels = useMemo(() => {
		return subCategoryLabels.map(i => i?.split(':').slice(0, -1).join(':'))
	}, [subCategoryLabels])

	const onClick = useCallback(
		async (e, v) => {
			const subCategory = getSplittedSubCategoryLabels[v?.[0]?.index]
			const category = subCategoryLabels[v?.[0]?.index]?.split(':').reverse()[0]
			if (subCategory) {
				const response = await getTransactionsByCategoryAndSubCategory(
					category,
					subCategory,
					currentMonth,
					currentYear
				)
				if (response) setMonthTransactions(response)
			}
		},
		[
			currentMonth,
			currentYear,
			getSplittedSubCategoryLabels,
			getTransactionsByCategoryAndSubCategory,
			subCategoryLabels
		]
	)

	const data = useMemo(
		() => ({
			labels: getSplittedSubCategoryLabels,
			datasets: [
				{
					data: subCategoryValues,
					backgroundColor: 'rgba(88 212 64 / 0.75)'
				}
			]
		}),
		[getSplittedSubCategoryLabels, subCategoryValues]
	)

	const options = useMemo(
		() => ({
			type: 'bar',
			maintainAspectRatio: false,
			onClick,
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: false,
					text: t('graphBarTitle')
				}
			},
			scales: {
				x: {
					ticks: {
						autoSkip: true,
						maxRotation: 60,
						minRotation: 60,
						font: {
							size: 10
						}
					},
					grid: {
						display: false
					}
				},
				y: {
					beginAtZero: true,
					ticks: {
						font: {
							size: 10 // Smaller font for mobile
						}
					}
				}
			}
		}),
		[onClick, t]
	)

	if (subCategoryValues.length === 0)
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
					title={monthTransactions?.[0]?.subCategory}
					transactions={monthTransactions}
					onClose={() => setMonthTransactions([])}
					isSubcategory
				/>
			)}
			<Bar data={data} options={options} />
		</ChartContainer>
	)
}

export default DashboardBarGraph
