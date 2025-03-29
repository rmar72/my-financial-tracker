import React, { useMemo } from 'react';
import { Expense } from '../types/Expense';
import { Grid, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';

interface Props {
  expenses: Expense[];
  categories: { id: number; name: string }[];
}

const MonthView: React.FC<Props> = ({ expenses, categories }) => {
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
    <Grid container spacing={2}>
      {categoryIds.map((categoryId) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={categoryId}>
          <CategoryCard
            categoryId={categoryId}
            expenses={groupedByCategory[categoryId]}
            categories={categories}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MonthView;
