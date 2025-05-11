'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { Button, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const PrivacyPolicy = ({ params }) => {
    const { t } = useTranslation(params?.lng ?? 'en', 'privacyPolicy')
    const { back } = useRouter()
    return <Paper sx={styles.topSection}>
        <Typography variant='h6'>{t('title')}</Typography>
        <Typography variant='body1' sx={{ textAlign: 'justify' }}>{t('text')}</Typography>
        <Button variant='contained' onClick={() => back()} size="small">{t('button')}</Button>
    </Paper>
};

export default PrivacyPolicy;

const styles = {
    topSection: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '500px', backgroundColor: '#fff', boxShadow: '2px 2px 10px #4D4D4D33', borderRadius: '16px', gap: '25px', p: '25px' },
}
