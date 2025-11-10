// client/src/main.jsx (Update this file)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import theme from './theme'; // Import the custom theme
import './index.css'; // Import global styles

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Wrap the app with the custom theme */}
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);