import { fadeInStyles } from '@/utils/helpers'
import { Box, Card, Typography } from '@mui/material'
import React, { useState } from 'react'


const IncomeExpensesContainer = ({ leftSide, rightSide, title }) => {
    const [isHover, setIsHover] = useState(false)

    return <Card sx={styles.container} elevation={isHover ? 3 : 1} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {title && <Typography sx={{ fontWeight: 600 }}>{title}</Typography>}
        <Box sx={[styles.innerContainer, {}]}>
            <Box sx={styles.row}>
                {leftSide}
            </Box>
            <Box sx={styles.row}>
                {rightSide}
            </Box>
        </Box>
    </Card>
}

export default IncomeExpensesContainer


const styles = {
    container: {
        height: '80px',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between',
        minWidth: '250px', minHeight: 'fit-content', py: '5px', px: '16px', display: 'flex', backgroundColor: '#D6E6FF', '&:hover': { opacity: 0.7 },
        ...fadeInStyles()
    },
    innerContainer: {
        display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'space-between',
        alignItems: 'center', flex: 1,
    },
    row: { display: 'flex', flexDirection: 'column', gap: '5px' },
}