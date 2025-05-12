import { Box, Button, Divider, Typography } from '@mui/material';
import SimpleModal from './SimpleModal'
import { useFormat } from '@/hooks/useFormat';
import moment from 'moment';
import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

const GraphTransactionsModal = ({ title = '', transactions = [], isSubcategory, maxWidth, onClose = () => { }, extraclasses = {} }) => {
    const { currencyFormat } = useFormat();
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')

    const getText = useCallback(item => {
        if (isSubcategory)
            return item?.category

        return item?.subCategory ?? '-'
    }, [isSubcategory])

    return <SimpleModal onClose={onClose} title={title} maxWidth={maxWidth} extraclasses={extraclasses}>
        <Box sx={styles.dataContainer}>
            {transactions?.map((item, index) => <Box key={index} >
                <Box sx={styles.row}>
                    <Typography sx={{ flex: 1 }}>{getText(item)}</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center' }}>{moment(item?.date).format('DD/MM/YYYY')}</Typography>
                    <Typography sx={{ flex: 0.3, fontWeight: 600, textAlign: 'right', textShadow: `1px 2px 3px ${item?.amount >= 1000 ? 'salmon' : 'primary'}` }}>{currencyFormat(item?.amount)} $</Typography>
                </Box>

                {item?.description && <Box sx={styles.row}>
                    <Typography sx={{ fontStyle: 'italic' }} variant='caption'>{item?.description}</Typography>
                </Box>}

                <Divider sx={{ width: '100%' }} />
            </Box>
            )}
        </Box>
        <Box sx={styles.actionsContainer}>
            <Button variant='outlined' onClick={onClose}>{t('close')}</Button>
        </Box>
    </SimpleModal>
}

export default GraphTransactionsModal

const styles = {
    dataContainer: { display: 'flex', flexDirection: 'column', gap: '25px', px: '10px', maxHeight: '70vh', overflowY: 'auto' },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    rightInfo: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' },
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end', mt: '25px', mb: '10px' },
}