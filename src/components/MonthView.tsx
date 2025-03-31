import React, { useMemo } from 'react';
import { Expense } from '../types/Expense';
import { Grid, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';
import AddCategoryCard from './AddCategoryCard';
import { useAddCategoryMutation } from '../features/api/expensesApi';

interface Props {
  expenses: Expense[];
  categories: { id: number; name: string, budgetAmount: number | null }[];
  selectedMonth: string;
  selectedYear: string;
}

const MonthView: React.FC<Props> = ({
  expenses,
  categories,
  selectedMonth,
  selectedYear
}) => {
  const [addCategory] = useAddCategoryMutation();

  const groupedByCategory = useMemo(() => {
    const grouped: Record<number, Expense[]> = {};
    expenses.forEach((expense) => {
      if (!grouped[expense.categoryId]) grouped[expense.categoryId] = [];
      grouped[expense.categoryId].push(expense);
    });
    return grouped;
  }, [expenses]);

  return categories.length === 0 ? (
    <Typography variant="body1">No expenses for this month.</Typography>
  ) : (
    <Grid
      container
      spacing={3}
      sx={{
        bgcolor: '#f3e9e9',
        px: 3,
        py: 3,
        borderRadius: '4px'
      }}
    >
      {categories.map((cat) => (
        <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <CategoryCard
            categoryId={cat.id}
            budgetAmount={cat.budgetAmount}
            expenses={groupedByCategory[cat.id] || []}
            categories={categories}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </Grid>
      ))}

      <Grid key="add-category" size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AddCategoryCard
          onAdd={async (name) => {
            await addCategory({ name }).unwrap();
          }} 
        />
      </Grid>
    </Grid>
  );
};

export default MonthView;
