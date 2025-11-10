// client/src/components/TopicList.jsx

import React from 'react';
import { Box, Alert } from '@mui/material';
import TopicCard from './TopicCard';

/**
 * TopicList Component
 * Renders the list of goals. It relies on the parent (App.jsx) to fetch the data
 * and passes down callbacks (onUpdate, onDelete) to trigger a refresh in the parent 
 * after any CRUD operation.
 */
const TopicList = ({ topics, onUpdate, onDelete, user }) => {
    
    // Handlers that simply tell the parent component (App.jsx) to refresh the data
    const handleTopicUpdate = () => onUpdate();
    const handleTopicDelete = () => onDelete();

    if (topics.length === 0) {
        return (
            <Alert severity="info" sx={{ mt: 2 }}>
                You have no learning goals! Use the form above to add your first topic.
            </Alert>
        );
    }

    return (
        <Box>
            {topics.map(topic => (
                <TopicCard 
                    key={topic._id} 
                    topic={topic} 
                    // These props are passed down to the card to trigger a full refresh 
                    // of the list and dashboard after an action (Update/Delete)
                    onUpdate={handleTopicUpdate} 
                    onDelete={handleTopicDelete}
                    user={user}
                />
            ))}
        </Box>
    );
};

export default TopicList;