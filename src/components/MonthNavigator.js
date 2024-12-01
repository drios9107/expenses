import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'


const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const MonthNavigator = ({ currentMonth, currentYear, getPreviousMonth = () => { }, getNextMonth = () => { } }) => {
    return <Box sx={styles.container}>
        <IconButton onClick={getPreviousMonth}>
            <ArrowLeft />
        </IconButton>
        <Typography>{months[currentMonth]} {currentYear}</Typography>
        <IconButton onClick={getNextMonth}>
            <ArrowRight />
        </IconButton>
    </Box>
}

export default MonthNavigator

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }
}