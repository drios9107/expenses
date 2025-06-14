import DetailsDrawer from '@/components/DetailsDrawer'
import { useTranslation } from '@/hooks/useTranslation'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React from 'react'

const Details = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'role');

    return <DetailsDrawer onClose={onClose}>
        <Box sx={styles.row}>
            <Typography variant="body1" sx={{ fontWeight: '600' }}>{t('name')}: </Typography>
            <Typography variant="body1">{item.name}</Typography>
        </Box>

        <Box sx={styles.row}>
            <Typography variant="body1" sx={{ fontWeight: '600' }}>{t('created_at')}: </Typography>
            <Typography variant="body1">{moment(item?.created_at).format('YYYY-MM-DD')}</Typography>
        </Box>
    </DetailsDrawer>
}

export default Details

const styles = {
    row: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px' },
}