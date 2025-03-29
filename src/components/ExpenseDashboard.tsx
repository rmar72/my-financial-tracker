import React, { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Expense } from '../types/Expense';
import { useGetExpensesQuery } from '../features/api/expensesApi';
import YearSelector from './YearSelector';
import MonthTabs from './MonthTabs';
import MonthView from './MonthView';
import { format } from 'date-fns';

const ExpenseDashboard: React.FC = () => {
  const { data: expenses = [], isLoading, isError } = useGetExpensesQuery();

  const groupedByYear = useMemo(() => {
    const grouped: Record<string, Expense[]> = {};
    expenses.forEach(expense => {
      const year = format(new Date(expense.date), 'yyyy');
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(expense);
    });
    return grouped;
  }, [expenses]);

  const availableYears = Object.keys(groupedByYear).sort((a, b) => +b - +a);
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || '');

  const expensesForSelectedYear = groupedByYear[selectedYear] || [];

  if (isLoading) {
    return <Typography>Loading expenses...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Failed to load expenses.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Expense Overview
      </Typography>

      <YearSelector
        years={availableYears}
        selectedYear={selectedYear}
        onChange={setSelectedYear}
      />

      <MonthTabs expenses={expensesForSelectedYear}>
        {(filteredMonthExpenses) => (
          <MonthView expenses={filteredMonthExpenses} />
        )}
      </MonthTabs>
    </Box>
  );
};

export default ExpenseDashboard;
