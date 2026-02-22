import SimpleModal from '@/components/SimpleModal'
import { Box, Button } from '@mui/material';
import { useCallback, useDeferredValue, useEffect, useState } from 'react';
import { useTransaction } from '@/hooks';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import FormActionButtons from '@/components/FormActionButtons';
import { nanoid } from 'nanoid';
import MuiTextfieldWithoutControl from '@/components/inputs/MuiTextFieldWithoutControl';
import moment from 'moment';
import { useToast } from '@/hooks/useToast';


const RawMultiTransactions = ({ onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', ['common', 'transactions'])
    const { isLoading, createManyTransactions } = useTransaction();
    const [allData, setAllData] = useState([{ id: nanoid(), description: '' }])
    const [currentValue, setCurrentValue] = useState({ id: nanoid(), description: '' })
    const delay = useDeferredValue(currentValue)
    const { toastError } = useToast()

    const updateLine = useCallback(() => {
        const { description = '', id } = delay
        setAllData((prev = []) => {
            const index = prev.findIndex(i => i.id === id)
            const result = [...prev]
            if (index > -1)
                result[index] = { id, description }

            return result
        })
    }, [delay])

    useEffect(() => {
        if (delay?.description && delay?.description !== '')
            updateLine(delay)
    }, [delay, updateLine])

    const onSubmit = useCallback(async e => {
        e?.preventDefault()
        const result = allData.map((i, index) => {
            const dataArray = i.description.split('|')

            if (dataArray.length !== 5)
                return { error: `${t('transactions:missing_data_in_line')} ${index + 1}` }

            const [stringDate, category, subcategory, amount, description] = dataArray

            const date = moment(stringDate, 'YYYY/MM/DD', true)
            if (!date.isValid())
                return { error: `${t('transactions:invalid_date_in_line')} ${index + 1}` }

            if (isNaN(amount))
                return { error: `${t('transactions:invalid_amount_in_line')} ${index + 1}` }

            return {
                date: date.valueOf(),
                category,
                subcategory,
                amount,
                description,
                type: 'cup',
                isExpense: true,
                isRecurrent: false
            }
        })

        const errorExists = result.find(i => i?.error)
        if (errorExists)
            toastError(errorExists.error)

        const response = await createManyTransactions(allData);

        if (response)
            onClose()
    }, [allData, createManyTransactions, onClose, t, toastError])

    const addLine = useCallback(() => {
        const id = nanoid()
        setAllData(v => [...v, { id, description: '' }])
    }, [])

    return <SimpleModal onClose={onClose} title={t('common:create')} isLoading={isLoading}>
        <Box sx={styles.container}>
            <Box sx={styles.container}>
                {allData.map((i) =>
                    <MuiTextfieldWithoutControl
                        key={i.id}
                        fieldName={'description'}
                        setState={description => setCurrentValue({ description, id: i.id })}
                        options={{ label: t('transactions:description'), multiline: true }}
                    />
                )}
            </Box>
            <Button variant='outlined' onClick={addLine}>{t('transactions:add')}</Button>
            <FormActionButtons onClose={onClose} onClick={onSubmit} />
        </Box>
    </SimpleModal>
}

export default RawMultiTransactions

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}