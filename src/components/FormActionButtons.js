import { useTranslation } from '@/hooks/useTranslation';
import { Box, Button } from '@mui/material'
import { useParams } from 'next/navigation';
import React from 'react'

const FormActionButtons = ({ onClose, onClick }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'common')

    return <Box sx={styles.actionsContainer}>
        <Button variant='outlined' onClick={onClose}>{t('common:cancel')}</Button>
        <Button variant='contained' onClick={onClick}>{t('common:save')}</Button>
    </Box>
}

export default FormActionButtons


const styles = {
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end' },
}
