// client/src/components/TopicCard.jsx

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Grid,
    Chip,
    LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import StreakIcon from '@mui/icons-material/LocalFireDepartment';
import { updateTopic, deleteTopic } from '../api/topics'; 

// Helper function to determine chip color based on progress
const getProgressProps = (progress) => {
    switch (progress) {
        case 'Done':
            return { label: 'Completed', color: 'success', icon: <CheckCircleIcon /> };
        case 'In Progress':
            return { label: 'In Progress', color: 'primary' };
        default:
            return { label: 'Not Started', color: 'default' };
    }
};

// Helper function to calculate a simple, fake progress percentage for the bar
const calculateProgressPercent = (progress, datesStudied, estimatedDurationDays) => {
    if (progress === 'Done') return 100;
    if (progress === 'Not Started') return 0;
    
    const daysStudiedCount = new Set(datesStudied.map(d => new Date(d).toDateString())).size;
    
    // Ensures progress doesn't exceed 99% if status is not 'Done'
    const percent = Math.min(
        99, 
        Math.floor((daysStudiedCount / estimatedDurationDays) * 100)
    );
    return percent;
};

const TopicCard = ({ topic, onUpdate, onDelete, user }) => {
    const { _id, title, progress, notes, datesStudied, estimatedDurationDays } = topic;
    const progressProps = getProgressProps(progress);
    const progressPercent = calculateProgressPercent(progress, datesStudied, estimatedDurationDays);
    const [isUpdating, setIsUpdating] = useState(false);

    // --- Streak Logic (Simple today's study check) ---
    const today = new Date().toDateString();
    const hasStudiedToday = datesStudied.some(d => new Date(d).toDateString() === today);
    const streakCount = new Set(datesStudied.map(d => new Date(d).toDateString())).size;

    // --- Action Handlers ---

    // Prepare config with auth token
    const getConfig = () => ({
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    // Handler to mark the topic as studied today (updates the datesStudied array)
    const handleMarkStudied = async () => {
        if (hasStudiedToday || isUpdating || progress === 'Done') return;

        setIsUpdating(true);
        try {
            const newDatesStudied = [...datesStudied, new Date()];
            await updateTopic(_id, { datesStudied: newDatesStudied }, getConfig());
            onUpdate(); // Trigger parent refresh
        } catch (error) {
            console.error('Error marking studied:', error);
        } finally {
            setIsUpdating(false);
        }
    };
    
    // Handler for updating the progress status (e.g., changing to 'Done')
    const handleStatusUpdate = async (newProgress) => {
        setIsUpdating(true);
        try {
            await updateTopic(_id, { progress: newProgress }, getConfig());
            onUpdate(); // Trigger parent refresh
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Handler for delete
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete the goal: "${title}"?`)) return;

        setIsUpdating(true);
        try {
            await deleteTopic(_id, getConfig());
            onDelete(); // Trigger parent refresh
        } catch (error) {
            console.error('Error deleting topic:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const getBorderColor = () => {
        if (progress === 'Done') return '#2e7d32';
        if (progress === 'In Progress') return '#1976d2';
        return '#e0e0e0';
    };

    return (
        <Card 
            elevation={0}
            sx={{ 
                mb: 2.5,
                borderLeft: `4px solid ${getBorderColor()}`,
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Grid container spacing={2}>
                    {/* Topic Title and Status */}
                    <Grid item xs={12} md={8}>
                        <Typography 
                            variant="h6" 
                            component="div"
                            sx={{ 
                                fontWeight: 600,
                                mb: 1.5,
                                color: 'text.primary',
                                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                            }}
                        >
                            {title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                                size="medium"
                                label={progressProps.label}
                                color={progressProps.color}
                                icon={progressProps.icon}
                                sx={{ 
                                    fontWeight: 600,
                                    fontSize: '0.8125rem',
                                }}
                            />
                            <Chip
                                size="medium"
                                label={`${streakCount} Day${streakCount !== 1 ? 's' : ''}`}
                                color="secondary"
                                icon={<StreakIcon />}
                                variant="outlined"
                                sx={{ 
                                    fontWeight: 500,
                                    fontSize: '0.8125rem',
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Progress Bar */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    Progress
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: progressProps.color === 'success' ? 'success.main' : 'primary.main',
                                    }}
                                >
                                    {progressPercent}%
                                </Typography>
                            </Box>
                            <LinearProgress 
                                variant="determinate" 
                                value={progressPercent} 
                                sx={{ 
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'grey.200',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 5,
                                        backgroundColor: progress === 'Done' 
                                            ? 'success.main'
                                            : 'primary.main',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Notes */}
                    {notes && (
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: 1.5,
                                    bgcolor: 'grey.50',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                }}
                            >
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                    sx={{ 
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {notes.length > 200 ? `${notes.substring(0, 200)}...` : notes}
                                </Typography>
                            </Box>
                        </Grid>
                    )}

                    {/* Actions */}
                    <Grid item xs={12}>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                gap: 1.5, 
                                flexWrap: 'wrap',
                                pt: 1,
                            }}
                        >
                            {progress !== 'Done' && (
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleStatusUpdate('Done')}
                                    disabled={isUpdating}
                                    sx={{ 
                                        minWidth: { xs: '100%', sm: 'auto' },
                                        flex: { xs: '1 1 auto', sm: '0 0 auto' },
                                    }}
                                >
                                    Mark Done
                                </Button>
                            )}
                            
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<StreakIcon />}
                                onClick={handleMarkStudied}
                                disabled={isUpdating || hasStudiedToday || progress === 'Done'}
                                sx={{ 
                                    minWidth: { xs: '100%', sm: 'auto' },
                                    flex: { xs: '1 1 auto', sm: '0 0 auto' },
                                }}
                            >
                                {hasStudiedToday ? 'Studied Today!' : 'Mark Studied'}
                            </Button>

                            <Button
                                size="medium"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}
                                disabled={isUpdating}
                                sx={{ 
                                    minWidth: { xs: '100%', sm: 'auto' },
                                    flex: { xs: '1 1 auto', sm: '0 0 auto' },
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default TopicCard;