'use client';
import DashboardGraphSection from "@/components/DashboardGraphSection";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import DashboardTopSection from "@/components/DashboardTopSection";
import RenderDayCards from "@/components/RenderDayCards";
import { useDashboard, useDashboardContext } from "@/hooks";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, useMediaQuery } from "@mui/material";

export default function Home({ params }) {
  const { t } = useTranslation(params?.lng, 'dashboard')
  const { isLoading, conditionalContainerStyles, currentMonth, currentYear,
    getPreviousMonth, getNextMonth, conditionalGraphContainerStyles,
    conditionalGraphStyles, isHover1, setIsHover1, isHover2, setIsHover2 } = useDashboard(true);
  const { days } = useDashboardContext()
  const isMobile = useMediaQuery("@media (max-width:500px)");


  if (isLoading)
    return <DashboardSkeleton />

  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '25px' }}>
    <DashboardTopSection
      currentMonth={currentMonth}
      currentYear={currentYear}
      getPreviousMonth={getPreviousMonth}
      getNextMonth={getNextMonth} t={t} conditionalContainerStyles={conditionalContainerStyles}
    />
    <DashboardGraphSection
      conditionalGraphStyles={conditionalGraphStyles}
      isHover1={isHover1}
      setIsHover1={setIsHover1}
      isHover2={isHover2}
      setIsHover2={setIsHover2}
      currentMonth={currentMonth}
      currentYear={currentYear}
    />
    <RenderDayCards days={days} />
  </Box>
}


const styles = {
  container: { flex: 1, flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  graphContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  daysContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start' },
  graph: { height: '300px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
}
