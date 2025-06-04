import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator = ({ message = 'Loading...' }: LoadingIndicatorProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: 2,
    }}
  >
    <CircularProgress 
      sx={{ 
        color: 'primary.main',
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        },
      }} 
    />
    <Typography 
      color="text.secondary"
      sx={{
        fontFamily: "'Crimson Text', 'Garamond', serif",
        fontStyle: 'italic',
      }}
    >
      {message}
    </Typography>
  </Box>
); 