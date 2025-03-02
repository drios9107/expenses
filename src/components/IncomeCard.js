import { useDashboardContext } from '@/hooks';
import { useFormat } from '@/hooks/useFormat';
import { Box, Card, Typography } from '@mui/material'
import moment from 'moment'
import { useState } from 'react';

const IncomeCard = () => {
    const { biggestIncome = 0, biggestIncomeDate } = useDashboardContext();
    const [isHover, setIsHover] = useState(false)
    const { currencyFormat } = useFormat();

    return <Card sx={styles.container} elevation={isHover ? 3 : 1} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>Biggest Income</Typography>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>Date</Typography>
        </Box>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right' }}>{currencyFormat(biggestIncome)} $</Typography>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right' }}>{biggestIncomeDate ? moment(biggestIncomeDate).format('DD/MM/YYYY') : '-'}</Typography>
        </Box>
    </Card>
}

export default IncomeCard

const styles = {
    container: {
        width: '220px', height: '80px', px: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', gap: '15px', backgroundColor: '#D6E6FF', '&:hover': { opacity: 0.7 }
    },
    row: { display: 'flex', flexDirection: 'column', gap: '5px' },
}