import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTransaction } from '@/hooks'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import FormActionButtons from '@/components/FormActionButtons'
import MuiTextfieldWithoutControl from '@/components/inputs/MuiTextFieldWithoutControl'
import moment from 'moment'
import { useToast } from '@/hooks/useToast'

const RawMultiTransactions = ({ onClose = () => {} }) => {
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', ['common', 'transactions'])
	const { isLoading, createManyTransactions } = useTransaction()
	const [allData, setAllData] = useState('')
	const { toastError } = useToast()

	const onSubmit = useCallback(
		async e => {
			e?.preventDefault()
			const result = allData.split('*').map((l, index) => {
				const dataArray = l.split('|')

				if (dataArray.length !== 5) return { error: `${t('transactions:missing_data_in_line')} ${index + 1}` }

				const [stringDate, category, subcategory, amount, description] = dataArray

				const date = moment(stringDate.trim(), 'YYYY/MM/DD', true)
				if (!date.isValid()) return { error: `${t('transactions:invalid_date_in_line')} ${index + 1}` }

				if (isNaN(amount)) return { error: `${t('transactions:invalid_amount_in_line')} ${index + 1}` }

				return {
					date: date.valueOf(),
					category: category.trim(),
					subcategory: subcategory.trim(),
					amount: parseFloat(amount),
					description: description.trim(),
					type: 'cup',
					isExpense: true,
					isRecurrent: false
				}
			})

			const errorExists = result.find(i => i?.error)
			if (errorExists) {
				toastError(errorExists.error)
				return
			}
			const response = await createManyTransactions(result)

			if (response) onClose()
		},
		[allData, createManyTransactions, onClose, t, toastError]
	)

	return (
		<SimpleModal onClose={onClose} title={t('common:create')} isLoading={isLoading}>
			<Box sx={styles.container}>
				<Box sx={styles.container}>
					<MuiTextfieldWithoutControl
						fieldName={'description'}
						state={allData}
						options={{
							label: t('transactions:description'),
							multiline: true,
							onBlur: e => setAllData(e?.target?.value)
						}}
					/>
				</Box>
				<FormActionButtons onClose={onClose} onClick={onSubmit} />
			</Box>
		</SimpleModal>
	)
}

export default RawMultiTransactions

const styles = {
	container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' }
}
