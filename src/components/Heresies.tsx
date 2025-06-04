import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChurchIcon from '@mui/icons-material/Church';
import { LoadingIndicator } from './LoadingIndicator';
import type { HeresiesChecklist } from '../types';

export const Heresies = () => {
  const [data, setData] = useState<HeresiesChecklist | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetch('/heresies_checklist.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((json) => {
        if (!json || !json.heresies || !json.catholic_teachings_about_jesus) {
          throw new Error('Invalid data format');
        }
        setData(json);
      })
      .catch((err) => {
        console.error('Error loading data:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <LoadingIndicator message="Loading heresies checklist..." />;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography sx={{ mt: 4 }}>
        No data available
      </Typography>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      '& > *': {
        width: '100%',
        maxWidth: '100%',
      },
    }}>
      <Box sx={{ 
        mb: { xs: 4, sm: 5, md: 6 }, 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: { xs: 2, sm: 3 },
            color: 'primary.main',
            textAlign: 'center',
            fontFamily: "'Crimson Text', 'Garamond', serif",
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            position: 'relative',
            width: '100%',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '2px',
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, rgba(139,0,0,0.2), rgba(139,0,0,0.6), rgba(139,0,0,0.2))'
                : 'linear-gradient(90deg, rgba(255,107,107,0.2), rgba(255,107,107,0.6), rgba(255,107,107,0.2))',
            }
          }}
        >
          Catholic Teachings About Jesus
        </Typography>
        <Card 
          sx={{ 
            mt: 3,
            width: '100%',
            maxWidth: '100%',
            border: theme.palette.mode === 'light'
              ? '1px solid rgba(139,0,0,0.1)'
              : '1px solid rgba(255,107,107,0.2)',
            position: 'relative',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 6px 20px rgba(139,0,0,0.1)'
                : '0 6px 20px rgba(255,107,107,0.1)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, rgba(139,0,0,0.1), rgba(218,165,32,0.1), rgba(139,0,0,0.1))'
                : 'linear-gradient(90deg, rgba(255,107,107,0.1), rgba(255,215,0,0.1), rgba(255,107,107,0.1))',
            }
          }}
        >
          <CardContent sx={{ 
            p: { xs: 2, sm: 3 },
            width: '100%',
            '&:last-child': { pb: { xs: 2, sm: 3 } },
          }}>
            <List sx={{ 
              py: 0, 
              width: '100%',
              maxWidth: '100%',
            }}>
              {data.catholic_teachings_about_jesus?.map((teaching) => (
                <ListItem 
                  key={teaching}
                  sx={{
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? 1 : 2,
                    py: { xs: 1.5, sm: 2 },
                    px: 0,
                    width: '100%',
                    maxWidth: '100%',
                    '&:not(:last-child)': {
                      borderBottom: theme.palette.mode === 'light'
                        ? '1px solid rgba(139,0,0,0.1)'
                        : '1px solid rgba(139,0,0,0.1)',
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: isMobile ? 24 : 40,
                      color: theme.palette.mode === 'light' 
                        ? 'primary.main'
                        : 'primary.light',
                      transform: 'scale(0.9)',
                    }}
                  >
                    <ChurchIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={teaching}
                    sx={{
                      m: 0,
                      width: '100%',
                      maxWidth: '100%',
                      '& .MuiListItemText-primary': {
                        fontFamily: "'Crimson Text', 'Garamond', serif",
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        color: 'text.primary',
                        lineHeight: 1.6,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Typography 
        variant="h5" 
        sx={{ 
          mb: { xs: 2, sm: 3 },
          color: 'primary.main',
          textAlign: 'center',
          fontFamily: "'Crimson Text', 'Garamond', serif",
          fontSize: { xs: '1.5rem', sm: '1.75rem' },
          position: 'relative',
          width: '100%',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '2px',
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(90deg, rgba(139,0,0,0.2), rgba(139,0,0,0.6), rgba(139,0,0,0.2))'
              : 'linear-gradient(90deg, rgba(255,107,107,0.2), rgba(255,107,107,0.6), rgba(255,107,107,0.2))',
          }
        }}
      >
        Common Heresies
      </Typography>
      <Box sx={{ 
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 3 },
      }}>
        {data.heresies?.map((heresy, index) => (
          <Card 
            key={heresy.name} 
            sx={{ 
              width: '100%',
              maxWidth: '100%',
              border: theme.palette.mode === 'light'
                ? '1px solid rgba(139,0,0,0.1)'
                : '1px solid rgba(255,107,107,0.2)',
              position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'light'
                  ? '0 6px 20px rgba(139,0,0,0.1)'
                  : '0 6px 20px rgba(255,107,107,0.1)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(90deg, rgba(139,0,0,0.1), rgba(218,165,32,0.1), rgba(139,0,0,0.1))'
                  : 'linear-gradient(90deg, rgba(255,107,107,0.1), rgba(255,215,0,0.1), rgba(255,107,107,0.1))',
              }
            }}
          >
            <CardContent sx={{ 
              p: { xs: 2, sm: 3 },
              width: '100%',
              maxWidth: '100%',
              '&:last-child': { pb: { xs: 2, sm: 3 } },
            }}>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.4rem' },
                  fontFamily: "'Crimson Text', 'Garamond', serif",
                  borderBottom: theme.palette.mode === 'light'
                    ? '2px solid rgba(139,0,0,0.1)'
                    : '2px solid rgba(255,107,107,0.1)',
                  pb: 1,
                  mb: { xs: 2, sm: 3 },
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                {heresy.name}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: { xs: 2, sm: 3 },
                width: '100%',
                maxWidth: '100%',
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'flex-start',
                  gap: isMobile ? 1 : 2,
                  width: '100%',
                  maxWidth: '100%',
                }}>
                  <ErrorOutlineIcon 
                    color="error" 
                    sx={{ 
                      mt: isMobile ? 0 : 0.5,
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                      flexShrink: 0,
                    }} 
                  />
                  <Box sx={{ flex: 1, width: '100%', maxWidth: '100%' }}>
                    <Typography 
                      variant="subtitle2" 
                      color="error"
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 600,
                        mb: 0.5,
                        width: '100%',
                      }}
                    >
                      False Teaching:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontFamily: "'Crimson Text', 'Garamond', serif",
                        lineHeight: 1.6,
                        width: '100%',
                      }}
                    >
                      {heresy.false_teaching}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'flex-start',
                  gap: isMobile ? 1 : 2,
                  width: '100%',
                  maxWidth: '100%',
                }}>
                  <CheckCircleOutlineIcon 
                    color="success" 
                    sx={{ 
                      mt: isMobile ? 0 : 0.5,
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                      flexShrink: 0,
                    }} 
                  />
                  <Box sx={{ flex: 1, width: '100%', maxWidth: '100%' }}>
                    <Typography 
                      variant="subtitle2" 
                      color="success.main"
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 600,
                        mb: 0.5,
                        width: '100%',
                      }}
                    >
                      Catholic Truth:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontFamily: "'Crimson Text', 'Garamond', serif",
                        lineHeight: 1.6,
                        width: '100%',
                      }}
                    >
                      {heresy.catholic_truth}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
            {index < (data.heresies?.length ?? 0) - 1 && (
              <Divider sx={{ 
                borderColor: theme.palette.mode === 'light'
                  ? 'rgba(139,0,0,0.1)'
                  : 'rgba(255,107,107,0.1)',
              }} />
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
}; 
