'use client';;
import DashboardBarGraph from "@/components/graphs/DashboardBarGraph";
import DashboardPieGraph from "@/components/graphs/DashboardPieGraph";
import IncomeCard from "@/components/IncomeCard";
import Loader from "@/components/Loader";
import MonthNavigator from "@/components/MonthNavigator";
import { useDashboard, useRecurrentTransaction } from "@/hooks";
import { Box, Button, Card, Paper } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { isLoading, getDashboard } = useDashboard();
  const { runTransactions } = useRecurrentTransaction()

  const [currentMonth, setCurrentMonth] = useState(moment().month())
  const [currentYear, setCurrentYear] = useState(moment().year())

  useEffect(() => {
    getDashboard({ currentMonth, currentYear });
  }, [currentMonth, currentYear, getDashboard])

  const getPreviousMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else
      setCurrentMonth(currentMonth - 1)
  }, [currentMonth, currentYear])

  const getNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else
      setCurrentMonth(currentMonth + 1)
  }, [currentMonth, currentYear])

  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
    <Paper sx={styles.container}>
      <IncomeCard />
      <Box sx={styles.monthNavigatorContainer}>
        <MonthNavigator
          currentMonth={currentMonth}
          currentYear={currentYear}
          getPreviousMonth={getPreviousMonth}
          getNextMonth={getNextMonth}
        />
        <Button variant='contained' onClick={() => runTransactions()}>Refresh</Button>
      </Box>
      <Card sx={{ width: '200px' }} />
    </Paper>
    <Box sx={styles.graphContainer}>
      <Paper sx={styles.graph}>
        <DashboardBarGraph currentMonth={currentMonth} currentYear={currentYear} />
      </Paper>
      <Paper sx={styles.graph}>
        <DashboardPieGraph currentMonth={currentMonth} currentYear={currentYear} />
      </Paper>
    </Box>
    {isLoading && <Loader isLoading />}
  </Box>
}

const styles = {
  container: { flex: 1, display: 'flex', flexDirection: 'row', borderRadius: '16px', gap: '25px', p: '25px', justifyContent: 'center', alignItems: 'center' },
  monthNavigatorContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '80px', flex: 1 },
  graphContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '25px' },
  graph: { height: '300px', p: '25px', flex: 1, borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
}
