import React, { useMemo } from 'react';
import { Expense } from '../types/Expense';
import { Grid, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';

interface Props {
  expenses: Expense[];
  categories: { id: number; name: string }[];
  selectedMonth: string;
  selectedYear: string;
}

const MonthView: React.FC<Props> = ({ expenses, categories, selectedMonth, selectedYear }) => {
  const groupedByCategory = useMemo(() => {
    const grouped: Record<number, Expense[]> = {};
    expenses.forEach((expense) => {
      if (!grouped[expense.categoryId]) grouped[expense.categoryId] = [];
      grouped[expense.categoryId].push(expense);
    });
    return grouped;
  }, [expenses]);

  const categoryIds = Object.keys(groupedByCategory).map(Number);

  return categoryIds.length === 0 ? (
    <Typography variant="body1">No expenses for this month.</Typography>
  ) : (
    <Grid container spacing={1} sx={{ bgcolor: '#fcfdff', height: '50vh' }}>
      {categoryIds.map((categoryId) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ mx: '40px' }} key={categoryId}>
          <CategoryCard
            categoryId={categoryId}
            expenses={groupedByCategory[categoryId]}
            categories={categories}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MonthView;
