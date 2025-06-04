import { Box, Toolbar, Typography, Tabs, Tab, Container, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface LayoutProps {
  mode: 'light' | 'dark';
  onModeChange: (mode: 'light' | 'dark') => void;
}

export const Layout = ({ mode, onModeChange }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') setValue(0);
    else if (location.pathname === '/heresies') setValue(1);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrolled(contentRef.current.scrollTop > 100);
      }
    };

    const currentContent = contentRef.current;
    currentContent?.addEventListener('scroll', handleScroll);
    return () => currentContent?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    // First, dispatch a custom event to close any open sections
    const closeEvent = new CustomEvent('closeAllSections');
    window.dispatchEvent(closeEvent);

    // Set the new value and navigate
    setValue(newValue);
    navigate(newValue === 0 ? '/' : '/heresies');

    // Wait for DOM updates and scroll
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

    });
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/nonnobisdomine62/catholic-bible-cheatsheet', '_blank');
  };

  const toggleColorMode = () => {
    onModeChange(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh',
      bgcolor: 'background.default',
      width: '100vw',
      maxWidth: '100vw',
      overflow: 'hidden',
    }}>
      <Box 
        ref={contentRef}
        component="main"
        role="main"
        sx={{ 
          flex: 1,
          overflowY: 'auto',
          width: '100%',
          maxWidth: '100%',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === 'light' 
              ? 'rgba(139,0,0,0.1)' 
              : 'rgba(255,107,107,0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'light'
              ? 'rgba(139,0,0,0.3)'
              : 'rgba(255,107,107,0.3)',
            borderRadius: '4px',
            '&:hover': {
              background: theme.palette.mode === 'light'
                ? 'rgba(139,0,0,0.5)'
                : 'rgba(255,107,107,0.5)',
            },
          },
        }}
      >
        <Box sx={{
          bgcolor: 'background.paper',
          backgroundImage: theme.palette.mode === 'light'
            ? 'linear-gradient(to bottom, rgba(139,0,0,0.95), rgba(139,0,0,0.85))'
            : 'linear-gradient(to bottom, rgba(255,107,107,0.95), rgba(255,107,107,0.85))',
          pb: 1,
          width: '100%',
          maxWidth: '100%',
        }}>
          <Container maxWidth={false} sx={{ width: '100%', maxWidth: '100% !important', px: { xs: 1, sm: 2, md: 3 } }}>
            <Toolbar 
              sx={{ 
                flexDirection: 'column', 
                py: { xs: 1.5, sm: 2, md: 2.5 },
                px: { xs: 1, sm: 2, md: 3 },
                width: '100%',
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                width: '100%', 
                justifyContent: 'flex-end',
                mb: { xs: 1, sm: 1.5 },
                gap: 1,
              }}>
                <IconButton 
                  onClick={toggleColorMode} 
                  color="inherit"
                  sx={{ 
                    color: 'secondary.light',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton 
                  onClick={handleGitHubClick}
                  color="inherit"
                  sx={{ 
                    color: 'secondary.light',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
              <Typography 
                variant="h4" 
                component="div" 
                sx={{ 
                  color: 'secondary.light',
                  textAlign: 'center',
                  fontFamily: "'Crimson Text', 'Garamond', serif",
                  fontSize: {
                    xs: '1.5rem',
                    sm: '1.75rem',
                    md: '2rem'
                  },
                  fontWeight: 600,
                  mb: { xs: 0.5, sm: 1 },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '0.05em',
                  '&::before, &::after': {
                    content: '""',
                    display: isTablet ? 'none' : 'inline-block',
                    width: '40px',
                    height: '2px',
                    bgcolor: 'secondary.light',
                    mx: 2,
                    verticalAlign: 'middle',
                  },
                }}
              >
                Catholic Bible Cheatsheet
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'rgba(255,250,240,0.9)',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  mb: 0.5,
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.9rem',
                    md: '1rem',
                  },
                  px: 2,
                }}
              >
                Sacred Scripture & Catholic Teachings
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'rgba(255,250,240,0.8)',
                  textAlign: 'center',
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.85rem',
                    md: '0.9rem',
                  },
                  px: 2,
                  mb: 1,
                }}
              >
                Based on the Catholic Bible Cheatsheet from Dr. Taylor Marshall at the New Saint Thomas Institute (NSTI)
              </Typography>
            </Toolbar>
            <Box sx={{ 
              position: 'sticky',
              top: 0,
              bgcolor: 'inherit',
              zIndex: 1100,
              backdropFilter: 'blur(8px)',
              boxShadow: isScrolled ? (theme.palette.mode === 'light' 
                ? '0 4px 20px rgba(139,0,0,0.1)'
                : '0 4px 20px rgba(0,0,0,0.2)') : 'none',
              transition: 'box-shadow 0.3s ease',
              width: '100%',
              maxWidth: '100%',
            }}>
              <Tabs 
                value={value} 
                onChange={handleChange}
                centered
                variant={isMobile ? "fullWidth" : "standard"}
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'secondary.light',
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                  },
                  '& .MuiTabs-flexContainer': {
                    width: '100%',
                  },
                  '& .MuiTab-root': {
                    color: 'rgba(255,250,240,0.7)',
                    fontSize: {
                      xs: '0.85rem',
                      sm: '0.95rem',
                      md: '1.1rem'
                    },
                    fontFamily: "'Crimson Text', 'Garamond', serif",
                    textTransform: 'none',
                    letterSpacing: '0.05em',
                    minWidth: {
                      xs: '50%',
                      sm: 120,
                    },
                    px: {
                      xs: 1,
                      sm: 2,
                      md: 3,
                    },
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'secondary.light',
                    },
                    '&:hover': {
                      color: 'secondary.light',
                      opacity: 0.9,
                    },
                  },
                }}
              >
                <Tab label="Bible Verses" />
                <Tab label="Heresies Checklist" />
              </Tabs>
            </Box>
          </Container>
        </Box>
        <Container 
          maxWidth={false} 
          sx={{ 
            mt: { xs: 2, sm: 3, md: 4 }, 
            mb: { xs: 4, sm: 6, md: 8 },
            px: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            maxWidth: '100% !important',
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}; 
