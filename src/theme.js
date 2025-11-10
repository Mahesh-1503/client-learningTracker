// client/src/theme.js
import { createTheme } from '@mui/material/styles';

// Modern, professional theme with improved design system
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Professional blue
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#424242', // Classic gray
            light: '#6d6d6d',
            dark: '#212121',
            contrastText: '#ffffff',
        },
        success: {
            main: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20',
        },
        error: {
            main: '#c62828',
            light: '#ef5350',
            dark: '#b71c1c',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '10px 24px',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6366f1',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: { xs: 2, sm: 3 },
                    paddingRight: { xs: 2, sm: 3 },
                },
            },
        },
    },
});

export default theme;