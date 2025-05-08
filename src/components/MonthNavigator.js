import { useTranslation } from '@/hooks/useTranslation'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React from 'react'


const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
]

const MonthNavigator = ({ currentMonth, currentYear, getPreviousMonth = () => { }, getNextMonth = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')
    return <Box sx={styles.container}>
        <IconButton onClick={getPreviousMonth}>
            <ArrowLeft />
        </IconButton>
        <Typography sx={{ userSelect: 'none' }}>{t(`months.${months[currentMonth]}`)} {currentYear}</Typography>
        <IconButton onClick={getNextMonth}>
            <ArrowRight />
        </IconButton>
    </Box>
}

export default MonthNavigator

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }
}