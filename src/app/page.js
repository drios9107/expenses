'use client';
import DashboardSkeleton from "@/components/DashboardSkeleton";
import DayCard from "@/components/DayCard";
import ExpensesCard from "@/components/ExpensesCard";
import DashboardBarGraph from "@/components/graphs/DashboardBarGraph";
import DashboardPieGraph from "@/components/graphs/DashboardPieGraph";
import IncomeCard from "@/components/IncomeCard";
import MonthNavigator from "@/components/MonthNavigator";
import { useDashboard, useDashboardContext, useRecurrentTransaction } from "@/hooks";
import { Box, Button, Paper, useMediaQuery } from "@mui/material";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";

export default function Home() {
  const { isLoading, conditionalContainerStyles, currentMonth, currentYear,
    getPreviousMonth, getNextMonth, conditionalGraphContainerStyles,
    conditionalGraphStyles, isHover1, setIsHover1, isHover2, setIsHover2 } = useDashboard();
  const { days } = useDashboardContext()
  const { runTransactions } = useRecurrentTransaction()
  const isMobile = useMediaQuery("@media (max-width:500px)");

  const [selectedDate, setSelectedDate] = useState()

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
        <Button variant='contained' onClick={() => runTransactions()}>Run Recurrence</Button>
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

const styles = {
  container: { flex: 1, flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  monthNavigatorContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '80px', flex: 1 },
  graphContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  daysContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start' },
  graph: { height: '300px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
}
