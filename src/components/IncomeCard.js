import { useDashboard } from '@/hooks';
import { Box, Card, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

const IncomeCard = ({ }) => {
    const { lastIncome = 0, lastIncomeDate } = useDashboard();

    return <Card sx={styles.container}>
        <Box sx={styles.row}>
            <Typography variant='body2'>Last Income</Typography>
            <Typography variant='body2'>Date</Typography>
        </Box>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>{lastIncome} $</Typography>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>{lastIncomeDate ? moment(lastIncomeDate).format('DD/MM/YYYY') : '-'}</Typography>
        </Box>
    </Card>
}

export default IncomeCard

const styles = {
    container: { width: '200px', height: '80px', px: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '15px', backgroundColor: '#D6E6FF' },
    row: { display: 'flex', flexDirection: 'column', gap: '5px' },
}