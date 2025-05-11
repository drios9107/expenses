'use client';
import DashboardSkeleton from "@/components/DashboardSkeleton";
import DayCard from "@/components/DayCard";
import ExpensesCard from "@/components/ExpensesCard";
import DashboardBarGraph from "@/components/graphs/DashboardBarGraph";
import DashboardPieGraph from "@/components/graphs/DashboardPieGraph";
import IncomeCard from "@/components/IncomeCard";
import MonthNavigator from "@/components/MonthNavigator";
import { useDashboard, useDashboardContext, useRecurrentTransaction } from "@/hooks";
import { useTranslation } from "@/hooks/useTranslation";
import GetStorage from "@/utils/GetStorage";
import { Box, Button, Paper, useMediaQuery } from "@mui/material";
import moment from "moment";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home({ params }) {
  const { t } = useTranslation(params?.lng, 'dashboard')
  const { isLoading, conditionalContainerStyles, currentMonth, currentYear,
    getPreviousMonth, getNextMonth, conditionalGraphContainerStyles,
    conditionalGraphStyles, isHover1, setIsHover1, isHover2, setIsHover2 } = useDashboard();
  const { days } = useDashboardContext()
  const { runTransactions } = useRecurrentTransaction()
  const { getFromStorage } = GetStorage()
  const isMobile = useMediaQuery("@media (max-width:500px)");

  const [selectedDate, setSelectedDate] = useState()
  const [needToRunRecurrence, setNeedToRunRecurrence] = useState(false)

  useEffect(() => {
    const lastRecurrenceDate = getFromStorage('lastRecurrenceDate')
    console.log('***lastRecurrenceDate', lastRecurrenceDate, moment().isAfter(lastRecurrenceDate, 'day'))
    if ((lastRecurrenceDate && moment().isAfter(lastRecurrenceDate, 'day')) || !lastRecurrenceDate)
      setNeedToRunRecurrence(true)
  }, [getFromStorage])

  const onSelected = useCallback((day) => {
    const title = moment(day).format('YYYY-MM-DD');

    setSelectedDate({
      title,
      day: days[title]
    })
  }, [days])

  const existingDates = useMemo(() => {
    const result = Object.keys(days).map((item) => {
      const [year, month, date] = item.split('-');
      return moment().set({ year, month: month - 1, date }).toDate()
    })

    return result;
  }, [days])

  const getRecurrentButtonStyles = useMemo(() => {
    return needToRunRecurrence ?
      styles.blinkingButton :
      {}
  }, [needToRunRecurrence])

  const handleRecurrence = useCallback(async () => {
    const response = await runTransactions();
    if (response)
      setNeedToRunRecurrence(false)
  }, [runTransactions])

  if (isLoading)
    return <DashboardSkeleton />

  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '25px' }}>
    <Paper sx={[styles.container, conditionalContainerStyles]}>
      <IncomeCard />
      <Box sx={styles.monthNavigatorContainer}>
        <MonthNavigator
          currentMonth={currentMonth}
          currentYear={currentYear}
          getPreviousMonth={getPreviousMonth}
          getNextMonth={getNextMonth}
        />
        <Button variant='contained' onClick={handleRecurrence} sx={getRecurrentButtonStyles}>{t('runRecurrence')}</Button>
      </Box>
      <ExpensesCard />
    </Paper>
    <Box sx={[styles.graphContainer, conditionalGraphContainerStyles]}>
      <Paper sx={[styles.graph, conditionalGraphStyles]} elevation={isHover1 ? 3 : 1} onMouseEnter={() => setIsHover1(true)} onMouseLeave={() => setIsHover1(false)}>
        <DashboardBarGraph currentMonth={currentMonth} currentYear={currentYear} />
      </Paper>
      <Paper sx={[styles.graph, conditionalGraphStyles]} elevation={isHover2 ? 3 : 1} onMouseEnter={() => setIsHover2(true)} onMouseLeave={() => setIsHover2(false)}>
        <DashboardPieGraph currentMonth={currentMonth} currentYear={currentYear} />
      </Paper>
    </Box>
    <Box sx={[styles.daysContainer, conditionalGraphContainerStyles]}>
      {Object.keys(days).map((item, index) => <DayCard key={index} title={item} day={days[item]} />)}
    </Box>
  </Box>
}

const borderColor = 'rgb(169 212 250)';

const styles = {
  container: { flex: 1, flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  monthNavigatorContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '80px', flex: 1 },
  graphContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  daysContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start' },
  graph: { height: '300px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  blinkingButton: {
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
  }
}
