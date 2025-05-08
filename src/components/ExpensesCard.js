import { useDashboardContext } from '@/hooks';
import { useFormat } from '@/hooks/useFormat';
import { useTranslation } from '@/hooks/useTranslation';
import { Box, Card, Typography } from '@mui/material'
import { useParams } from 'next/navigation';
import { useState } from 'react';

const ExpensesCard = () => {
    const { monthExpenses = 0, monthIncome = 0 } = useDashboardContext();
    const [isHover, setIsHover] = useState(false)
    const { currencyFormat } = useFormat();
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')

    return <Card sx={styles.container} elevation={isHover ? 3 : 1} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>{t("expenses")}</Typography>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>{t("income")}</Typography>
        </Box>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right', textShadow: '1px 2px 3px salmon' }} >{currencyFormat(monthExpenses)} $</Typography>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right', textShadow: '1px 2px 3px limegreen' }}>{currencyFormat(monthIncome)} $</Typography>
        </Box>
    </Card>
}

export default ExpensesCard

const styles = {
    container: {
        width: '250px', height: '80px', px: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', gap: '15px', backgroundColor: '#D6E6FF', '&:hover': { opacity: 0.7 }
    },
    row: { display: 'flex', flexDirection: 'column', gap: '5px' },
}