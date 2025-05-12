import { Box, Button, Divider, Typography } from '@mui/material';
import SimpleModal from './SimpleModal'
import { useCallback } from 'react';
import { useFormat } from '@/hooks/useFormat';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

const DayCardModal = ({ title = '', day, maxWidth, onClose = () => { }, extraclasses = {} }) => {
    const { currencyFormat } = useFormat();
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')

    const getText = useCallback(item => {
        const subCategory = item?.subCategory ?? '';
        const category = item?.category ? `(${item.category})` : '';
        return `${subCategory?.split(':')?.[0]} ${category}`
    }, [])

    return <SimpleModal onClose={onClose} title={title} maxWidth={maxWidth} extraclasses={extraclasses}>
        <Box sx={styles.dataContainer}>
            {day?.map((item, index) => <Box key={index} >
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
            <Button variant='outlined' onClick={onClose}>{t('close')}</Button>
        </Box>
    </SimpleModal>
}

export default DayCardModal

const styles = {
    dataContainer: { display: 'flex', flexDirection: 'column', gap: '25px', px: '10px', maxHeight: '70vh', overflowY: 'auto' },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    rightInfo: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' },
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end', mt: '25px', mb: '10px' },
}