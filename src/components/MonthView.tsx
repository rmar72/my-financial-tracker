import React, { useMemo } from 'react';
import { Expense } from '../types/Expense';
import {
  Grid, 
  Typography,
  Card
 } from '@mui/material';
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

    <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ mx: '40px' }}>
        <Card
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            minWidth: 200,
            maxWidth: 250,
            height: '105px',
            mt: '8px',
            borderRadius: '16px',
            background: 'white',
            boxShadow: `
              6px 6px 12px #bebebe,
              -6px -6px 12px #ffffff
            `,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'scale(1.015)',
              boxShadow: `
                4px 4px 8px #bebebe,
                -4px -4px 8px #ffffff
              `
            }
          }}
          onClick={() => {
            console.log('Add Category clicked');
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: 'grey.600' }}
          >
            + Add Category
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthView;
