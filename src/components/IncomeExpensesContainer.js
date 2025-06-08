import { fadeInStyles } from '@/utils/helpers'
import { Box, Card, Typography } from '@mui/material'
import React, { useState } from 'react'


const IncomeExpensesContainer = ({ leftSide, rightSide }) => {
    const [isHover, setIsHover] = useState(false)

    return <Card sx={styles.container} elevation={isHover ? 3 : 1} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <Box sx={styles.row}>
            {leftSide}
        </Box>
        <Box sx={styles.row}>
            {rightSide}
        </Box>
    </Card>
}

export default IncomeExpensesContainer


const styles = {
    container: {
        width: '250px', height: '80px', px: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', gap: '15px', backgroundColor: '#D6E6FF', '&:hover': { opacity: 0.7 },
        ...fadeInStyles()
    },
    row: { display: 'flex', flexDirection: 'column', gap: '5px' },
}