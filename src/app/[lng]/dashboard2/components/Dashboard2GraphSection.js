import DashboardBarGraph from "@/components/graphs/DashboardBarGraph";
import DashboardPieGraph from "@/components/graphs/DashboardPieGraph";
import { Grid2, Paper, Typography } from "@mui/material";

const Dashboard2GraphSection = ({
  isHover1,
  setIsHover1,
  currentMonth,
  currentYear,
  isHover2,
  setIsHover2,
}) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper
          sx={styles.graphCard}
          elevation={isHover1 ? 5 : 1}
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
        >
          <Typography sx={styles.graphTitle}>Expenses by sub-category</Typography>
          <DashboardBarGraph currentMonth={currentMonth} currentYear={currentYear} />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper
          sx={styles.graphCard}
          elevation={isHover2 ? 5 : 1}
          onMouseEnter={() => setIsHover2(true)}
          onMouseLeave={() => setIsHover2(false)}
        >
          <Typography sx={styles.graphTitle}>Distribution by category</Typography>
          <DashboardPieGraph currentMonth={currentMonth} currentYear={currentYear} />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard2GraphSection;

const styles = {
  graphCard: {
    p: { xs: "10px", md: "16px" },
    borderRadius: "20px",
    height: "100%",
    minHeight: "320px",
    border: "1px solid #d9e3ff",
    background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 8px 22px rgba(20, 47, 79, 0.09)",
  },
  graphTitle: {
    textAlign: "center",
    fontWeight: 600,
    color: "#30486f",
    fontSize: "0.95rem",
    mb: "6px",
  },
};
