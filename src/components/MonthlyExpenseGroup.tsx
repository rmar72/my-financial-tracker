import React from 'react';
import { Box, Typography } from '@mui/material';
import { Expense } from '../types/Expense';
import CategoryExpenseTable from './CategoryExpenseTable';

interface Props {
  month: string;
  expenses: Expense[];
  categoryMap: Record<number, string>;
  categories: { id: number; name: string }[];
}

const MonthlyExpenseGroup: React.FC<Props> = ({ month, expenses, categoryMap, categories }) => {
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.categoryId]) acc[expense.categoryId] = [];
    acc[expense.categoryId].push(expense);
    return acc;
  }, {} as Record<number, Expense[]>);

  return (
    <Box key={month} mb={4}>
      <Typography variant="h6" gutterBottom>
        {month}
      </Typography>

      {Object.entries(expensesByCategory).map(([categoryId, categoryExpenses]) => (
        <CategoryExpenseTable
          key={categoryId}
          categoryId={+categoryId}
          categoryName={categoryMap[+categoryId] || `Category ${categoryId}`}
          expenses={categoryExpenses}
          categories={categories}
        />
      ))}
    </Box>
  );
};

export default MonthlyExpenseGroup;
