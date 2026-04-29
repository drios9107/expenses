'use client';
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { useDashboard, useDashboardContext } from "@/hooks";
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Dashboard2TopSection from "./components/Dashboard2TopSection";
import Dashboard2DebtSection from "./components/Dashboard2DebtSection";
import Dashboard2GraphSection from "./components/Dashboard2GraphSection";
import Dashboard2DailyExpenseSection from "./components/Dashboard2DailyExpenseSection";

export default function Dashboard2Page({ params }) {
  const { t } = useTranslation(params?.lng, "dashboard");
  const {
    isLoading,
    currentMonth,
    currentYear,
    getPreviousMonth,
    getNextMonth,
    isHover1,
    setIsHover1,
    isHover2,
    setIsHover2,
    personsDebt,
    getDashboard,
  } = useDashboard(true);
  const { days } = useDashboardContext();
  const isMobile = useMediaQuery("@media (max-width:500px)");

  if (isLoading) return <DashboardSkeleton />;

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.header}>
        {/* <Typography sx={styles.kicker}>Dashboard</Typography> */}

      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: isMobile ? "12px" : "20px" }}>
        <Dashboard2TopSection
          t={t}
          currentMonth={currentMonth}
          currentYear={currentYear}
          getPreviousMonth={getPreviousMonth}
          getNextMonth={getNextMonth}
        />
        {personsDebt.length > 0 && <Dashboard2DebtSection personsDebt={personsDebt} />}
        <Dashboard2GraphSection
          isHover1={isHover1}
          setIsHover1={setIsHover1}
          isHover2={isHover2}
          setIsHover2={setIsHover2}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
        <Dashboard2DailyExpenseSection
          days={days}
          getDashboard={() => getDashboard({ currentMonth, currentYear })}
        />
      </Box>
    </Box>
  );
}

const styles = {
  pageContainer: {
    p: { xs: "8px", sm: "14px", md: "18px" },
    borderRadius: "22px",
    background: "linear-gradient(180deg, #f7fbff 0%, #eef4ff 100%)",
  },
  header: {
    mb: "14px",
    px: "4px",
  },
  kicker: {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#5b7cfa",
  },
  title: {
    fontWeight: 600,
    color: "#1d3557",
  },
};
