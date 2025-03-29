import React, { useState, useMemo } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Expense } from '../types/Expense';
import { format } from 'date-fns';

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
        sx={{ mb: 3 }}
      >
        {months.map((month) => (
          <Tab key={month} label={month} />
        ))}
      </Tabs>

      <Box>
        {children(selectedMonthExpenses)}
      </Box>
    </Box>
  );
};

export default MonthTabs;
