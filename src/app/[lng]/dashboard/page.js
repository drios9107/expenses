'use client';
import DashboardDebtSection from "@/components/DashboardDebtSection";
import DashboardGraphSection from "@/components/DashboardGraphSection";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import DashboardTopSection from "@/components/DashboardTopSection";
import DailyExpenseSection from "@/components/DailyExpenseSection";
import { useDashboard, useDashboardContext } from "@/hooks";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, useMediaQuery } from "@mui/material";

export default function Home({ params }) {
  const { t } = useTranslation(params?.lng, 'dashboard')
  const { isLoading, conditionalContainerStyles, currentMonth, currentYear,
    getPreviousMonth, getNextMonth, conditionalGraphContainerStyles,
    conditionalGraphStyles, isHover1, setIsHover1, isHover2, setIsHover2, personsDebt, getDashboard } = useDashboard(true);
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
    {personsDebt.length > 0 && <DashboardDebtSection t={t} conditionalContainerStyles={conditionalContainerStyles} personsDebt={personsDebt} />}
    <DashboardGraphSection
      conditionalGraphStyles={conditionalGraphStyles}
      isHover1={isHover1}
      setIsHover1={setIsHover1}
      isHover2={isHover2}
      setIsHover2={setIsHover2}
      currentMonth={currentMonth}
      currentYear={currentYear}
    />
    <DailyExpenseSection days={days} getDashboard={() => getDashboard({ currentMonth, currentYear })} />
  </Box>
}
