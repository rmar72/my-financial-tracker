import React, { useState } from 'react';
import { Box, Tabs, Tab, Fade } from '@mui/material';
import { Expense } from '../types/Expense';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface Props {
  expenses: Expense[];
  children: (monthExpenses: Expense[], selectedMonth: string, selectedYear: string ) => React.ReactNode;
  selectedYear: string;
}

const MonthTabs: React.FC<Props> = ({ expenses, children, selectedYear }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const selectedMonth = MONTHS[selectedTab];

  const filteredExpenses = expenses.filter((expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    return month === selectedMonth;
  });

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 3,
          mx: 'auto',
          px: 1,
          py: 0.5,
          backgroundColor: '#efefef',
          borderRadius: '10px',
          width: '93%',
          minHeight: 44,
          '& .MuiTabs-flexContainer': {
            padding: '0 3px',
            position: 'relative',
            zIndex: 1
          },
          '& .MuiTabs-indicator': {
            top: 3,
            bottom: 3,
            right: 3,
            height: 'auto',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
            transition: 'all 0.25s ease'
          }
        }}
      >
        {MONTHS.map((month) => (
          <Tab
            key={month}
            label={month}
            disableRipple
            sx={{
              fontWeight: 500,
              minHeight: 44,
              minWidth: '72px',
              px: 2,
              my: 0,
              borderRadius: '8px',
              opacity: 0.7,
              color: 'text.primary',
              textTransform: 'none',
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 1
              },
              '&.Mui-selected': {
                opacity: 1,
                color: 'text.primary'
              }
            }}
          />
        ))}
      </Tabs>

      <Fade in={true} timeout={250} key={selectedTab}>
        <Box sx={{ minHeight: 400 }}>
          {children(filteredExpenses, selectedMonth, selectedYear)}
        </Box>
      </Fade>
    </Box>
  );
};

export default MonthTabs;
