import { Box, Button, Divider, Typography } from '@mui/material';
import SimpleModal from './SimpleModal'
import { useCallback, useEffect, useState } from 'react';
import { useFormat } from '@/hooks/useFormat';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import FormTransaction from '@/components/crud/transaction/Form';

const DayCardModal = ({ title = '', day, maxWidth, onClose = () => { }, extraclasses = {} }) => {
    const { currencyFormat } = useFormat();
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')
    const [openTransaction, setOpenTransaction] = useState(false);
    const [predefinedDay, setPredefinedDay] = useState();
    const [localDay, setLocalDay] = useState(day)

    useEffect(() => {
        setLocalDay(day)
    }, [day])

    const getText = useCallback(item => {
        const subCategory = item?.subCategory ?? '';
        const category = item?.category ? `(${item.category})` : '';
        return `${subCategory?.split(':')?.[0]} ${category}`
    }, [])

    const onOpenTransaction = useCallback(() => {
        if (day?.[0]?.date)
            setPredefinedDay(day?.[0]?.date)
        setOpenTransaction(true)
    }, [day])

    const onCloseTransaction = useCallback((data) => {
        setOpenTransaction(false)
        setPredefinedDay()
        if (data) {
            const dayValue = {
                date: data?.date,
                category: data?.category,
                subCategory: data?.subCategory,
                amount: data?.amount ?? 0,
                description: data?.description
            }
            setLocalDay(values => [...values, dayValue].sort((a, b) => b.amount - a.amount))
        }
    }, [setLocalDay])

    const onCloseCardModal = useCallback(() => {
        onClose(localDay.length !== day.length)
    }, [day.length, localDay.length, onClose])

    return <>
        <SimpleModal onClose={onCloseCardModal} title={title} maxWidth={maxWidth} extraclasses={extraclasses}>
            <Box sx={styles.dataContainer}>
                {localDay?.map((item, index) => <Box key={index} >
                    <Box sx={styles.row}>
                        <Typography>{getText(item)}</Typography>
                        <Typography sx={{ fontWeight: 600, textShadow: `1px 2px 3px ${item?.amount >= 1000 ? 'salmon' : 'primary'}` }}>{currencyFormat(item?.amount)} $</Typography>
                    </Box>

                    {item?.description && <Box sx={styles.row}>
                        <Typography sx={{ fontStyle: 'italic' }} variant='caption'>{item?.description}</Typography>
                    </Box>}

                    <Divider sx={{ width: '100%' }} />
                </Box>
                )}
            </Box>
            <Box sx={styles.actionsContainer}>
                <Button variant='contained' onClick={onOpenTransaction}>{t('createTransaction')}</Button>
                <Button variant='outlined' onClick={onCloseCardModal}>{t('close')}</Button>
            </Box>
        </SimpleModal>

        {openTransaction && <FormTransaction onClose={onCloseTransaction} predefinedDay={predefinedDay} />}
    </>
}

export default DayCardModal

const styles = {
    dataContainer: { display: 'flex', flexDirection: 'column', gap: '25px', px: '10px', maxHeight: '70vh', overflowY: 'auto' },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    rightInfo: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' },
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end', mt: '25px', mb: '10px' },
}