'use client';;
import DashboardBarGraph from "@/components/graphs/DashboardBarGraph";
import DashboardPieGraph from "@/components/graphs/DashboardPieGraph";
import IncomeCard from "@/components/IncomeCard";
import Loader from "@/components/Loader";
import MonthNavigator from "@/components/MonthNavigator";
import { useDashboard, useRecurrentTransaction } from "@/hooks";
import { Box, Button, Card, Paper, useMediaQuery } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
  const { isLoading, getDashboard } = useDashboard();
  const { runTransactions } = useRecurrentTransaction()
  const isMobile = useMediaQuery("@media (max-width:500px)");

  const [currentMonth, setCurrentMonth] = useState(moment().month())
  const [currentYear, setCurrentYear] = useState(moment().year())

  const conditionalContainerStyles = useMemo(() => {
    return isMobile ? { borderRadius: '8px', gap: '10px', p: '10px', } : { borderRadius: '16px', gap: '25px', p: '25px', }
  }, [isMobile])

  const conditionalGraphContainerStyles = useMemo(() => {
    return isMobile ? { gap: '10px' } : { gap: '25px' }
  }, [isMobile])

  const conditionalGraphStyles = useMemo(() => {
    return isMobile ? { p: '5px', borderRadius: '8px', } : { p: '25px', borderRadius: '16px', }
  }, [isMobile])

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
        <Button variant='contained' onClick={() => runTransactions()}>Refresh</Button>
      </Box>
      <Card sx={{ width: '200px' }} />
    </Paper>
    <Box sx={[styles.graphContainer, conditionalGraphContainerStyles]}>
      <Paper sx={[styles.graph, conditionalGraphStyles]}>
        <DashboardBarGraph currentMonth={currentMonth} currentYear={currentYear} />
      </Paper>
      <Paper sx={[styles.graph, conditionalGraphStyles]}>
        <DashboardPieGraph currentMonth={currentMonth} currentYear={currentYear} />
      </Paper>
    </Box>
    {isLoading && <Loader isLoading />}
  </Box>
}

const styles = {
  container: { flex: 1, flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  monthNavigatorContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '80px', flex: 1 },
  graphContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  graph: { height: '300px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
}
