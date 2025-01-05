import { useDashboard } from '@/hooks';
import { Box, Card, Typography } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'

const ExpensesCard = ({ }) => {
    const { monthExpenses = 0 } = useDashboard();
    const [isHover, setIsHover] = useState(false)

    return <Card sx={styles.container} elevation={isHover ? 3 : 1} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <Box sx={styles.row}>
            <Typography variant='body2'>Expenses</Typography>
            {/* <Typography variant='body2'>Date</Typography> */}
        </Box>
        <Box sx={styles.row}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>{monthExpenses} $</Typography>
            {/* <Typography variant='body2' sx={{ fontWeight: 600 }}>{lastIncomeDate ? moment(lastIncomeDate).format('DD/MM/YYYY') : '-'}</Typography> */}
        </Box>
    </Card>
}

export default ExpensesCard

const styles = {
    container: { width: '200px', height: '80px', px: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '15px', backgroundColor: '#D6E6FF' },
    row: { display: 'flex', flexDirection: 'column', gap: '5px' },
}