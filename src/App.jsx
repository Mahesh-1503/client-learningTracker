// client/src/App.jsx (Refactored for Auth)

import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  CssBaseline,
  CircularProgress,
  Button,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";

import AddGoalForm from "./components/AddGoalForm";
import TopicList from "./components/TopicList";
import Dashboard from "./components/Dashboard";
import AuthForm from "./components/AuthForm"; // <-- NEW Import
import { fetchTopics } from "./api/topics";

function App() {
  // State to manage the authenticated user
  const [user, setUser] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // --- Authentication Handlers ---

  // Load user profile from local storage on initial mount
  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      try {
        setUser(JSON.parse(profile));
      } catch (e) {
        console.error("Failed to parse user profile:", e);
        localStorage.removeItem("profile");
      }
    }
    // Initial load of topics is handled in the data fetching hook below
  }, []);

  // Function passed to AuthForm upon successful sign in/up
  const handleAuthSuccess = (result, token) => {
    setUser({ result, token });
    setRefreshTrigger((prev) => prev + 1); // Trigger data fetch immediately
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setTopics([]); // Clear topics on logout
    setLoading(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  // --- Data Fetching Logic (Memoized to prevent unnecessary re-creation) ---
  const getTopics = useCallback(async () => {
    if (!user) {
      setTopics([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // Include token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await fetchTopics(config); // Pass config to fetchTopics
      setTopics(response.data);
    } catch (err) {
      // Handle 401 Unauthorized errors (token expired, etc.)
      if (err.response?.status === 401) {
        console.error("Token expired or invalid. Logging out.");
        handleLogout();
      } else {
        console.error("Error fetching topics:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [user]); // Re-create if user state changes

  // Fetch on mount and when refreshTrigger changes
  useEffect(() => {
    getTopics();
  }, [refreshTrigger, getTopics]);

  // Used by AddGoalForm and TopicList to trigger a refresh
  const handleGoalUpdate = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // --- Render Logic ---

  return (
    <CssBaseline>
      <AppBar 
        position="sticky" 
        color="primary"
        elevation={1}
        sx={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <MenuBookIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Learning Tracker
          </Typography>
          {user && (
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              size="medium"
              sx={{
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Logout
              </Box>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {!user ? (
        // Show Auth Form if no user is logged in
        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </Box>
      ) : (
        // Show App Content if user is logged in
        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2 },
          }}
        >
          <Container maxWidth="lg">
            {/* Welcome Section */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  mb: 0.5,
                  color: 'text.primary',
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                }}
              >
                Welcome back, {user.result.name.split(" ")[0]}! 👋
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                Track your learning progress and achieve your goals
              </Typography>
            </Box>

            {/* 1. Add Goal Form */}
            <Box sx={{ mb: 4 }}>
              <AddGoalForm onGoalAdded={handleGoalUpdate} user={user} />
            </Box>

            {loading ? (
              <Box 
                sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: 'center',
                  minHeight: '400px',
                }}
              >
                <CircularProgress size={48} thickness={4} />
              </Box>
            ) : (
              <>
                {/* 2. Dashboard */}
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3,
                      fontWeight: 700,
                      color: 'text.primary',
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    }}
                  >
                    Dashboard
                  </Typography>
                  <Dashboard topics={topics} />
                </Box>

                {/* 3. Topic List */}
                <Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3,
                      fontWeight: 700,
                      color: 'text.primary',
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    }}
                  >
                    Your Learning Goals
                  </Typography>
                  <TopicList
                    topics={topics}
                    onUpdate={handleGoalUpdate}
                    onDelete={handleGoalUpdate}
                    user={user}
                  />
                </Box>
              </>
            )}
          </Container>
        </Box>
      )}
    </CssBaseline>
  );
}

export default App;
