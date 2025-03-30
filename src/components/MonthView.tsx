import React, { useMemo } from 'react';
import { Expense } from '../types/Expense';
import {
  Grid, 
  Typography,
  Card
 } from '@mui/material';
import CategoryCard from './CategoryCard';
import { useAddCategoryMutation } from '../features/api/expensesApi';

interface Props {
  expenses: Expense[];
  categories: { id: number; name: string }[];
  selectedMonth: string;
  selectedYear: string;
}

const MonthView: React.FC<Props> = ({ expenses, categories, selectedMonth, selectedYear }) => {
  const [addCategory] = useAddCategoryMutation();
  const groupedByCategory = useMemo(() => {
    const grouped: Record<number, Expense[]> = {};
    expenses.forEach((expense) => {
      if (!grouped[expense.categoryId]) grouped[expense.categoryId] = [];
      grouped[expense.categoryId].push(expense);
    });
    return grouped;
  }, [expenses]);

  const categoryIds = categories.map((cat) => cat.id);

  return categoryIds.length === 0 ? (
    <Typography variant="body1">No expenses for this month.</Typography>
  ) : (
    <Grid
      container
      spacing={3}
      sx={{
        bgcolor: '#f3e9e9',
        px: 3,
        py: 3,
      }}
    >
      {categoryIds.map((categoryId) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={categoryId}>
          <CategoryCard
            categoryId={categoryId}
            expenses={groupedByCategory[categoryId] || []}
            categories={categories}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </Grid>
      ))}

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <Card
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            mt: '12px',
            height: '105px',
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
          onClick={async () => {
            const name = prompt('Enter new category name');
            if (name && name.trim()) {
              try {
                await addCategory({ name: name.trim() }).unwrap();
              } catch (err) {
                console.error('Failed to add category', err);
              }
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.600' }}>
            + Add Category
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthView;
