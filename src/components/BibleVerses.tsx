import { useState, useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LoadingIndicator } from './LoadingIndicator';
import type {
  BibleVerseCheatsheet as BibleVerseCheatsheetFromTypes,
  Category as CategoryFromTypes, // Import Category type for explicit typing
  Subcategory as SubcategoryFromTypes, // Import Subcategory type for explicit typing
  Verse as VerseFromTypes
} from '../types/index.ts';

const VersesList = ({ verses }: { verses: VerseFromTypes[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {verses.map((verse) => (
        <Card 
          key={verse.reference} 
          sx={{ 
            mb: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, rgba(139,0,0,0.1), rgba(218,165,32,0.1), rgba(139,0,0,0.1))',
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                mb: 1.5,
                gap: 1,
              }}
            >
              <Chip
                icon={<MenuBookIcon />}
                label={verse.reference}
                color="primary" 
                sx={{ 
                  minWidth: isMobile ? '100%' : 'auto',
                  '& .MuiChip-icon': {
                    color: 'inherit',
                  },
                  '& .MuiChip-label': {
                    width: isMobile ? '100%' : 'auto',
                    textAlign: 'center',
                  },
                }}
              />
              {verse.note && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontStyle: 'italic',
                    fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    flex: 1,
                  }}
                >
                  {verse.note}
                </Typography>
              )}
            </Box>
            <Typography 
              variant="body1"
              sx={{
                lineHeight: 1.7,
                color: 'text.primary',
                fontFamily: "'Crimson Text', 'Garamond', serif",
                fontSize: { xs: '1rem', sm: '1.1rem' },
                mt: isMobile ? 2 : 0,
              }}
            >
              {verse.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export const BibleVerses = () => {
  const [data, setData] = useState<BibleVerseCheatsheetFromTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    fetch('/bible_verse_cheatsheet.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((json) => {
        if (!json || !json.categories) {
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

    // Add event listener for closing sections
    const handleCloseAllSections = () => {
      setExpanded(false);
    };

    window.addEventListener('closeAllSections', handleCloseAllSections);
    return () => window.removeEventListener('closeAllSections', handleCloseAllSections);
  }, []);

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent, isExpanded: boolean
  ) => {
    if (!isExpanded) {
      setExpanded(false);
      return;
    }

    setExpanded(panel);

    const sectionElement = accordionRefs.current[panel];
    const scrollContainer = sectionElement?.closest('[role="main"]');

    if (sectionElement && scrollContainer) {
      setTimeout(() => {
        const sectionRect = sectionElement.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const scrollToPosition = sectionRect.top - containerRect.top + scrollContainer.scrollTop;

        scrollContainer.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });
      }, 800); // adjust the timeout value as needed
    } else {
      console.warn(`Section element or scroll container not found for panel: ${panel}`);
    }
  };

  if (loading) {
    return <LoadingIndicator message="Loading Bible verses..." />;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  if (!data || !data.categories) {
    return (
      <Typography sx={{ mt: 4 }}>
        No data available
      </Typography>
    );
  }

  return (
    <Box>
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          mb: 3,
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(to bottom right, #FFFAF0, #FDF5E6)'
            : 'linear-gradient(to bottom right, #1E1E1E, #121212)',
          border: theme.palette.mode === 'light'
            ? '1px solid rgba(139,0,0,0.1)'
            : '1px solid rgba(255,107,107,0.15)',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Crimson Text', 'Garamond', serif",
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontStyle: 'italic',
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          All Bible verses are from the Douay-Rheims, Complete: Challoner Revision Bible
        </Typography>
      </Paper>
      {data.categories.map((category: CategoryFromTypes) => (
        <Accordion
          key={category.name}
          expanded={expanded === category.name}
          onChange={handleAccordionChange(category.name)}
          ref={(el: HTMLDivElement | null) => {
            accordionRefs.current[category.name] = el;
          }}
          sx={{
            mb: 2,
            '&.Mui-expanded': {
              '& .MuiAccordionSummary-content': {
                mb: 0,
              },
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: 'primary.main' }} />
            }
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                fontFamily: "'Crimson Text', 'Garamond', serif",
                fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.4rem' },
              }}
            >
              {category.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: { xs: 2, sm: 3 } }}>
            {category.description && (
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                    pl: 2,
                    py: 1,
                    bgcolor: 'rgba(139,0,0,0.03)',
                  }}
                >
                  {category.description}
                </Typography>
              </Box>
            )}
            {category.subcategories ? (
              category.subcategories.map((subcategory: SubcategoryFromTypes) => (
                <Paper 
                  key={subcategory.name} 
                  sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    mb: 2,
                    border: '1px solid rgba(139,0,0,0.1)',
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{
                      mb: 2.5, 
                      fontWeight: 600,
                      color: 'primary.main',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      borderBottom: '2px solid',
                      borderColor: 'rgba(139,0,0,0.1)',
                      pb: 1,
                    }}
                  >
                    {subcategory.name}
                  </Typography>
                  <VersesList verses={subcategory.verses} />
                </Paper>
              ))
            ) : category.verses ? (
              <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                <VersesList verses={category.verses} />
              </Paper>
            ) : (
              <Typography color="text.secondary">No verses available</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}; 
