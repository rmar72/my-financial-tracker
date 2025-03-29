import React, { useState, useMemo } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Expense } from '../types/Expense';
import { format } from 'date-fns';
import { Fade } from '@mui/material';
interface Props {
  expenses: Expense[];
  children: (monthExpenses: Expense[]) => React.ReactNode;
}

const MonthTabs: React.FC<Props> = ({ expenses, children }) => {
  const groupedByMonth = useMemo(() => {
    const grouped: Record<string, Expense[]> = {};
    expenses.forEach((expense) => {
      const monthKey = format(new Date(expense.date), 'MMMM'); // e.g., "January"
      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(expense);
    });
    return grouped;
  }, [expenses]);

  const months = Object.keys(groupedByMonth);
  const [selectedTab, setSelectedTab] = useState(0);
  const selectedMonthKey = months[selectedTab];
  const selectedMonthExpenses = groupedByMonth[selectedMonthKey] || [];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          backgroundColor: '#eee',
          borderRadius: '10px',
          minHeight: 44,
          '& .MuiTabs-flexContainer': {
            padding: '0 3px',
            position: 'relative',
            zIndex: 1
          },
          '& .MuiTabs-indicator': {
            transition: 'all 0.25s ease',
            top: 3,
            bottom: 3,
            right: 3,
            height: 'auto',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)'
          }
        }}
      >
        {months.map((month) => (
          <Tab
            key={month}
            label={month}
            disableRipple
            sx={{
              fontWeight: 500,
              minHeight: 44,
              minWidth: 96,
              opacity: 0.7,
              color: 'text.primary',
              textTransform: 'initial',
              '&:hover': {
                opacity: 1
              },
              '&.Mui-selected': {
                opacity: 1,
                color: 'text.primary'
              },
              '@media (min-width: 900px)': {
                minWidth: 120
              }
            }}
          />
        ))}
      </Tabs>

      <Fade in={true} timeout={250} key={selectedTab}>
        <Box sx={{ minHeight: 400 }}>
          {children(selectedMonthExpenses)}
        </Box>
      </Fade>
    </Box>
  );
};

export default MonthTabs;
