import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import { Layout } from './components/Layout';
import { BibleVerses } from './components/BibleVerses';
import { Heresies } from './components/Heresies';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useMemo, useState } from 'react';

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#8B0000' : '#FF6B6B', // Deep red / Soft red
      dark: mode === 'light' ? '#4A0404' : '#FF4444',
      light: mode === 'light' ? '#B22222' : '#FF8585',
    },
    secondary: {
      main: mode === 'light' ? '#DAA520' : '#FFD700', // Golden color / Brighter gold
      dark: mode === 'light' ? '#B8860B' : '#FFC000',
      light: mode === 'light' ? '#FFD700' : '#FFE44D',
    },
    background: {
      default: mode === 'light' ? '#FDF5E6' : '#121212', // Old lace / Material dark
      paper: mode === 'light' ? '#FFFAF0' : '#1E1E1E', // Floral white / Softer dark
    },
    text: {
      primary: mode === 'light' ? '#2F1810' : '#E8E8E8',
      secondary: mode === 'light' ? '#5C4033' : '#B0B0B0',
    },
  },
  typography: {
    fontFamily: "'Crimson Text', 'Garamond', serif",
    h4: {
      fontWeight: 600,
      color: mode === 'light' ? '#8B0000' : '#FF6B6B',
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 600,
      color: mode === 'light' ? '#8B0000' : '#FF6B6B',
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 600,
      color: mode === 'light' ? '#8B0000' : '#FF6B6B',
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: mode === 'light' 
            ? '0 4px 8px rgba(0,0,0,0.1)' 
            : '0 4px 8px rgba(0,0,0,0.5)',
          border: mode === 'light' 
            ? '1px solid rgba(139,0,0,0.1)' 
            : '1px solid rgba(255,107,107,0.15)',
          background: mode === 'light'
            ? 'linear-gradient(to bottom right, #FFFAF0, #FDF5E6)'
            : 'linear-gradient(to bottom right, #1E1E1E, #121212)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundImage: mode === 'light'
            ? 'linear-gradient(to bottom right, #FFFAF0, #FDF5E6)'
            : 'linear-gradient(to bottom right, #2A2A2A, #202020)',
          boxShadow: mode === 'light'
            ? '0 4px 12px rgba(0,0,0,0.1)'
            : '0 4px 12px rgba(0,0,0,0.5)',
          border: mode === 'light'
            ? '1px solid rgba(139,0,0,0.1)'
            : '1px solid rgba(255,107,107,0.2)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
          borderRadius: '8px !important',
          marginBottom: '16px',
          boxShadow: mode === 'light'
            ? '0 4px 12px rgba(0,0,0,0.1)'
            : '0 4px 12px rgba(0,0,0,0.5)',
          border: mode === 'light'
            ? '1px solid rgba(139,0,0,0.1)'
            : '1px solid rgba(255,107,107,0.15)',
          background: mode === 'light'
            ? 'linear-gradient(to bottom right, #FFFAF0, #FDF5E6)'
            : 'linear-gradient(to bottom right, #1E1E1E, #121212)',
          '&.Mui-expanded': {
            margin: '0 0 16px 0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderBottom: mode === 'light'
            ? '1px solid rgba(139,0,0,0.1)'
            : '1px solid rgba(255,107,107,0.15)',
          '&.Mui-expanded': {
            background: mode === 'light'
              ? 'rgba(139,0,0,0.03)'
              : 'rgba(255,107,107,0.05)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Crimson Text', 'Garamond', serif",
          borderRadius: 4,
        },
        filled: {
          background: mode === 'light'
            ? 'linear-gradient(45deg, #8B0000, #B22222)'
            : 'linear-gradient(45deg, #FF6B6B, #FF8585)',
          color: '#FFFFFF',
          fontWeight: 600,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
  },
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout mode={mode} onModeChange={setMode} />}>
              <Route index element={<BibleVerses />} />
              <Route path="heresies" element={<Heresies />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
