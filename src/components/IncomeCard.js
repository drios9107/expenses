import { useDashboardContext } from '@/hooks';
import { Box, Card, Typography } from '@mui/material'
import moment from 'moment'
import { useState } from 'react';

const IncomeCard = () => {
    const { lastIncome = 0, lastIncomeDate } = useDashboardContext();
    const [isHover, setIsHover] = useState(false)

    return <Card sx={styles.container} elevation={isHover ? 3 : 1} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>Last Income</Typography>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>Date</Typography>
        </Box>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>{lastIncome} $</Typography>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>{lastIncomeDate ? moment(lastIncomeDate).format('DD/MM/YYYY') : '-'}</Typography>
        </Box>
    </Card>
}

export default IncomeCard

const styles = {
    container: { width: '200px', height: '80px', px: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '15px', backgroundColor: '#D6E6FF' },
    row: { display: 'flex', flexDirection: 'column', gap: '5px' },
}