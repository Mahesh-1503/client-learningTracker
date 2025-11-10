import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StreakIcon from "@mui/icons-material/LocalFireDepartment";
import ListIcon from "@mui/icons-material/ListAlt";

// --- Dashboard Logic: Calculates overall metrics (LOGIC UNCHANGED) ---
const calculateDashboardMetrics = (topics) => {
  const totalGoals = topics.length;
  const completedGoals = topics.filter((t) => t.progress === "Done").length;

  // Completion Percentage
  const completionPercent =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // --- Streak Logic: Calculates the longest current daily streak across all topics ---
  const allStudiedDates = topics.flatMap((t) => t.datesStudied);

  // 1. Get unique days studied across all topics
  const uniqueStudyDays = Array.from(
    new Set(allStudiedDates.map((d) => new Date(d).toDateString()))
  )
    .map((dateString) => new Date(dateString))
    .sort((a, b) => b.getTime() - a.getTime()); // Sort descending

  let currentStreak = 0;
  if (uniqueStudyDays.length === 0)
    return { totalGoals, completedGoals, completionPercent, currentStreak: 0 };

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Normalize to start of day

  // Check if user studied TODAY
  const hasStudiedToday = uniqueStudyDays.some(
    (d) => d.getTime() === currentDate.getTime()
  );
  if (hasStudiedToday) {
    currentStreak = 1;
  }

  // Check YESTERDAY
  let yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  let checkDate = hasStudiedToday ? yesterday : currentDate;

  for (let i = 0; i < uniqueStudyDays.length; i++) {
    const studyDay = uniqueStudyDays[i];

    // Find if this study day matches our check date
    if (studyDay.getTime() === checkDate.getTime()) {
      currentStreak += hasStudiedToday || i > 0 ? 1 : 0;
      // Move check date back one day
      checkDate = new Date(checkDate);
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (studyDay.getTime() < checkDate.getTime()) {
      // We've skipped a day, streak is broken
      break;
    }
  }

  // Logic remains clean as-is for sequential streak calculation.

  return {
    totalGoals,
    completedGoals,
    completionPercent,
    currentStreak,
  };
};

const Dashboard = ({ topics }) => {
  const { totalGoals, completedGoals, completionPercent, currentStreak } =
    calculateDashboardMetrics(topics);

  const metricCards = [
    {
      icon: <ListIcon sx={{ fontSize: { xs: 32, sm: 36 } }} />,
      value: totalGoals,
      label: "Total Goals",
      // ✨ Improvement: Use theme shades for better integration
      color: "primary",
      bgColor: "primary.lightest", // Assumes you have a very light shade
      iconColor: "primary.main",
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: { xs: 32, sm: 36 } }} />,
      value: completedGoals,
      label: "Completed",
      color: "success",
      bgColor: "success.lightest",
      iconColor: "success.main",
    },
    {
      icon: <StreakIcon sx={{ fontSize: { xs: 32, sm: 36 } }} />,
      value: currentStreak,
      label: "Day Streak",
      color: "warning", // Use warning for streak/fire department icon
      bgColor: "warning.lightest",
      iconColor: "warning.dark",
    },
  ];

  return (
    <Card
      // ✨ Improvement 1: Add subtle elevation for definition
      elevation={4}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        {" "}
        {/* Increased overall padding */}
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          {" "}
          {/* Increased grid spacing */}
          {/* Metric Cards Section */}
          {metricCards.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  // Use the resolved color for a better look
                  backgroundColor: (theme) =>
                    theme.palette[metric.color]?.lightest || metric.bgColor,
                  borderRadius: 2.5, // Slightly softer corners
                  p: { xs: 3, sm: 3.5 }, // Increased internal padding
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  // Removed border for cleaner look with elevation
                  // border: '1px solid',
                  // borderColor: 'divider',
                  // ✨ Improvement 2: Add hover effect with shadow
                  "&:hover": {
                    boxShadow: 8, // Stronger hover shadow
                    transform: "translateY(-4px)", // More noticeable lift
                  },
                  // Fallback shadow for default
                  boxShadow: 1,
                }}
              >
                <Box
                  sx={{
                    mb: 1.5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* Using theme palette color directly for icon */}
                  <Box
                    sx={{
                      color: (theme) =>
                        theme.palette[metric.color]?.main || metric.iconColor,
                    }}
                  >
                    {metric.icon}
                  </Box>
                </Box>
                <Typography
                  variant="h3" // Use h3 for impact
                  sx={{
                    fontWeight: 800, // Extra bold value
                    mb: 0.5,
                    color: "text.primary",
                    fontSize: { xs: "2rem", sm: "2.5rem" },
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  variant="subtitle1" // Clearer label size
                  sx={{
                    fontWeight: 600, // Bolder label
                    color: "text.secondary",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {metric.label}
                </Typography>
              </Box>
            </Grid>
          ))}
          {/* Horizontal Divider for Separation */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1, borderColor: "divider" }} />
          </Grid>
          {/* Progress Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  mb: 1.5,
                  gap: { xs: 0.5, sm: 0 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: "1.25rem", // Fixed size for emphasis
                  }}
                >
                  Overall Progress
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    fontSize: "1.25rem",
                  }}
                >
                  {completionPercent}% Complete
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={completionPercent}
                // ✨ Improvement 3: Thicker, bolder progress bar
                sx={{
                  height: 14, // Increased height
                  borderRadius: 7,
                  backgroundColor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 7,
                    // Use a gradient for a premium feel
                    backgroundImage: (theme) =>
                      `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
