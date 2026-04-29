import { Grid2, Typography } from "@mui/material";
import { useMemo } from "react";
import Dashboard2DayCard from "./Dashboard2DayCard";

const Dashboard2DailyExpenseSection = ({ days = {}, getDashboard = () => {} }) => {
  const cards = useMemo(
    () =>
      Object.keys(days).map((item, index) => (
        <Dashboard2DayCard key={index} title={item} day={days[item]} getDashboard={getDashboard} />
      )),
    [days, getDashboard]
  );

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography sx={styles.title}>Daily expenses</Typography>
      </Grid2>
      {cards}
    </Grid2>
  );
};

export default Dashboard2DailyExpenseSection;

const styles = {
  title: {
    color: "#30486f",
    fontWeight: 600,
    px: "4px",
  },
};
