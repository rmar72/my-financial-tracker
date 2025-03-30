import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Expense } from '../types/Expense';
import { useGetExpensesQuery } from '../features/api/expensesApi';
import YearSelector from './YearSelector';
import MonthTabs from './MonthTabs';
import MonthView from './MonthView';
import { format } from 'date-fns';

interface Props {
  categories: { id: number; name: string }[];
}

const ExpenseDashboard: React.FC<Props> = ({ categories }) => {
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

  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // 🧠 Ensure selectedYear is valid once availableYears is loaded
  useEffect(() => {
    if (!availableYears.includes(selectedYear) && availableYears.length > 0) {
      setSelectedYear(availableYears.includes(currentYear) ? currentYear : availableYears[0]);
    }
  }, [availableYears, selectedYear, currentYear]);

  const expensesForSelectedYear = groupedByYear[selectedYear] || [];

  if (isLoading) {
    return <Typography>Loading expenses...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Failed to load expenses.</Typography>;
  }

  return (
    <Box>
      <YearSelector
        years={availableYears}
        selectedYear={selectedYear}
        onChange={setSelectedYear}
      />

      <MonthTabs expenses={expensesForSelectedYear} selectedYear={selectedYear}>
        {(filteredMonthExpenses, selectedMonth) => (
          <MonthView
            expenses={filteredMonthExpenses}
            categories={categories}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        )}
      </MonthTabs>
    </Box>
  );
};

export default ExpenseDashboard;
