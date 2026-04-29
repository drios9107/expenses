import { Box, Paper, Typography } from "@mui/material";

const Dashboard2MetricCard = ({
  title,
  leftSide,
  rightSide,
  accent = "#5b7cfa",
  accentBorderMode = "full",
}) => {
  const borderStyle =
    accentBorderMode === "left"
      ? {
          borderColor: "#d9e3ff",
          borderLeftWidth: "4px",
          borderLeftColor: accent,
        }
      : {
          borderColor: accent,
        };

  return (
    <Paper sx={[styles.card, borderStyle]}>
      {title && (
        <Typography sx={[styles.title, { color: accent }]}>{title}</Typography>
      )}
      <Box sx={styles.body}>
        <Box sx={styles.column}>{leftSide}</Box>
        <Box sx={styles.column}>{rightSide}</Box>
      </Box>
    </Paper>
  );
};

export default Dashboard2MetricCard;

const styles = {
  card: {
    p: { xs: "12px", sm: "14px" },
    borderRadius: "16px",
    border: "1px solid",
    boxShadow: "0 8px 22px rgba(20, 47, 79, 0.09)",
    background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
  },
  title: {
    fontWeight: 600,
    mb: "8px",
    fontSize: "0.95rem",
  },
  body: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
};
