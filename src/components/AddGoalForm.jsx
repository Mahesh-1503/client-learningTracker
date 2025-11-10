// client/src/components/AddGoalForm.jsx

import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createTopic } from "../api/topics";

const initialFormState = {
  title: "",
  notes: "",
  estimatedDurationDays: 7,
};

const AddGoalForm = ({ onGoalAdded, user }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "estimatedDurationDays" ? Number(value) : value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.title.trim()) {
      setError("The goal title cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await createTopic(formData, config);
      setFormData(initialFormState);
      onGoalAdded();
    } catch (err) {
      setError("Failed to add goal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      // ✨ Improvement 1: Add a subtle elevation for depth
      elevation={4}
      sx={{
        borderRadius: 3, // Slightly more rounded corners
        // Remove the border as elevation often makes it redundant
        // border: '1px solid',
        // borderColor: 'divider',
        p: { xs: 2, sm: 3 }, // Responsive padding
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h5" // Use a larger variant for better visual hierarchy
          component="h2" // Semantic tag for screen readers
          sx={{
            fontWeight: 700, // Make it bolder
            mb: 3, // Increased margin for separation
            color: "primary.main", // Use the primary color for emphasis
            borderBottom: "2px solid",
            borderColor: "divider",
            pb: 1, // Padding bottom for the underline effect
          }}
        >
          🚀 Define a New Goal
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {" "}
            {/* Increased spacing for better separation */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="title"
                label="Goal Title"
                placeholder="e.g., Master Advanced React State Management"
                value={formData.title}
                onChange={handleChange}
                error={!!error}
                // ✍️ Improvement 2: Refined Helper Text
                helperText={
                  error || "A short, measurable, and clear title is best."
                }
                // Increased size slightly for readability
                inputProps={{ style: { fontSize: "1.05rem" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="notes"
                label="Notes (Optional)" // Clarify that it's optional
                placeholder="List key resources, milestones, or initial steps..."
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={4} // Increased rows for more space
                inputProps={{ style: { fontSize: "1rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="estimatedDurationDays"
                label="Duration (Days)"
                type="number"
                value={formData.estimatedDurationDays}
                onChange={handleChange}
                // Ensure the number is always an integer and positive
                inputProps={{ min: 1, step: 1, style: { fontSize: "1rem" } }}
                helperText="Target timeline in days (min 1 day)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // ✨ Improvement 3: Use secondary color for higher contrast, or stick to primary and use a stronger shadow.
                color="primary"
                disableElevation={false} // Allow the default elevation on press
                startIcon={<AddIcon />}
                disabled={loading}
                sx={{
                  height: { xs: 52, sm: 56 }, // Slightly taller button for better tapping/clicking
                  fontWeight: 700, // Bolder text
                  fontSize: "1rem",
                  mt: { xs: 0, sm: 0 }, // Adjust top margin for alignment with TextField
                }}
              >
                {loading ? "Creating..." : "Create Goal"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddGoalForm;
