'use client';;
import Balance from "@/components/Balance";
import DashboardBarGraph from "@/components/graphs/DashboardBarGraph";
import DashboardPieGraph from "@/components/graphs/DashboardPieGraph";
import Loader from "@/components/Loader";
import { useCategory, useDashboard, useRecurrentTransaction, useTransaction } from "@/hooks";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

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

export default function Home() {
  const { isLoading } = useDashboard();
  const { runTransactions } = useRecurrentTransaction()

  const [currentMonth, setCurrentMonth] = useState(moment().month())
  const [currentYear, setCurrentYear] = useState(moment().year())

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <IconButton onClick={getPreviousMonth}>
          <ArrowLeft />
        </IconButton>
        <Typography>{months[currentMonth]} {currentYear}</Typography>
        <IconButton onClick={getNextMonth}>
          <ArrowRight />
        </IconButton>
      </Box>
      <Button variant='contained' onClick={() => runTransactions()}>Refresh</Button>
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
  container: { flex: 1, display: 'flex', flexDirection: 'column', borderRadius: '16px', gap: '25px', p: '25px', justifyContent: 'center', alignItems: 'center' },
  graphContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '25px' },
  graph: { height: '300px', p: '25px', flex: 1, borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
}
