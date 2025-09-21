import { Box, Button, Grid2, Paper } from '@mui/material';
import IncomeCard from './IncomeCard';
import MonthNavigator from './MonthNavigator';
import ExpensesCard from './ExpensesCard';
import { fadeInStyles } from '@/utils/helpers';
import { useRecurrentTransaction } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import GetStorage from '@/utils/GetStorage';

const commonSize = { xs: 12, sm: 12, md: 6, lg: 4 }

const DashboardTopSection = ({ t, conditionalContainerStyles, currentMonth, currentYear, getPreviousMonth, getNextMonth }) => {
    const { runTransactions } = useRecurrentTransaction()
    const { getFromStorage } = GetStorage()
    const [needToRunRecurrence, setNeedToRunRecurrence] = useState(false)

    useEffect(() => {
        const lastRecurrenceDate = getFromStorage('lastRecurrenceDate')
        if ((lastRecurrenceDate && moment().isAfter(parseInt(lastRecurrenceDate), 'day')) || !lastRecurrenceDate)
            setNeedToRunRecurrence(true)
    }, [getFromStorage])


    const handleRecurrence = useCallback(async () => {
        const response = await runTransactions();
        if (response)
            setNeedToRunRecurrence(false)
    }, [runTransactions])

    return <Paper sx={conditionalContainerStyles}>
        <Grid2 container spacing={2} sx={fadeInStyles()}>
            <Grid2
                size={commonSize}
                sx={{
                    minWidth: { sm: '250px' },
                    justifySelf: 'flex-start'
                }}
            >
                <IncomeCard />
            </Grid2>

            <Grid2
                size={commonSize}
                sx={{
                    minWidth: { sm: '250px' },
                    justifySelf: 'center'
                }}
            >
                <Box sx={styles.monthNavigatorContainer}>
                    <MonthNavigator
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        getPreviousMonth={getPreviousMonth}
                        getNextMonth={getNextMonth}
                    />
                    <Button variant='contained' onClick={handleRecurrence} sx={needToRunRecurrence ? styles.blinkingButton : {}}>{t('runRecurrence')}</Button>
                </Box>
            </Grid2>

            <Grid2
                size={commonSize}
                sx={{ justifySelf: 'flex-end' }}
            >
                <ExpensesCard />
            </Grid2>
        </Grid2>
    </Paper>
}

export default DashboardTopSection

const borderColor = 'rgb(169 212 250)';
const styles = {
    monthNavigatorContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '80px', flex: 1 },
    blinkingButton: {
        whiteSpace: 'nowrap',
        fontSize: '0.8rem',
        position: 'relative',
        overflow: 'visible',
        margin: '6px',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '-6px',
            left: '-6px',
            right: '-6px',
            bottom: '-6px',
            border: `2px solid ${borderColor}`,
            borderRadius: 'inherit',
            animation: 'blink 1.5s infinite',
            pointerEvents: 'none',
            zIndex: 1,
        },
        '@keyframes blink': {
            '0%': {
                opacity: 1,
                transform: 'scale(1)',
            },
            '50%': {
                opacity: 0,
                transform: 'scale(1.05)',
            },
            '100%': {
                opacity: 1,
                transform: 'scale(1)',
            },
        }
    },
}