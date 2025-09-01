'use client';
import DashboardSkeleton from "@/components/DashboardSkeleton";
import DashboardTopSection from "@/components/DashboardTopSection";
import DashboardBarGraph from "@/components/graphs/DashboardBarGraph";
import DashboardPieGraph from "@/components/graphs/DashboardPieGraph";
import RenderDayCards from "@/components/RenderDayCards";
import { useDashboard, useDashboardContext } from "@/hooks";
import { useTranslation } from "@/hooks/useTranslation";
import { fadeInStyles } from "@/utils/helpers";
import { Box, Grid2, Paper, useMediaQuery } from "@mui/material";

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
    <DashboardTopSection currentMonth={currentMonth} currentYear={currentYear} getPreviousMonth={getPreviousMonth} getNextMonth={getNextMonth} t={t} conditionalContainerStyles={conditionalContainerStyles} />

    <Grid2 container spacing={2} sx={fadeInStyles()}>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <Paper sx={[styles.graph, conditionalGraphStyles]} elevation={isHover1 ? 3 : 1} onMouseEnter={() => setIsHover1(true)} onMouseLeave={() => setIsHover1(false)}>
          <DashboardBarGraph currentMonth={currentMonth} currentYear={currentYear} />
        </Paper>
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <Paper sx={[styles.graph, conditionalGraphStyles]} elevation={isHover2 ? 3 : 1} onMouseEnter={() => setIsHover2(true)} onMouseLeave={() => setIsHover2(false)}>
          <DashboardPieGraph currentMonth={currentMonth} currentYear={currentYear} />
        </Paper>
      </Grid2>
    </Grid2>

    <Grid2 container spacing={2} sx={fadeInStyles()}>
      <RenderDayCards days={days} />
    </Grid2>
  </Box>
}


const styles = {
  container: { flex: 1, flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  graphContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  daysContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start' },
  graph: { height: '300px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
}
