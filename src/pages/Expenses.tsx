import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem
} from '@mui/material';
import { useGetExpensesQuery, useAddExpenseMutation, useGetCategoriesQuery } from '../features/api/expensesApi';
import { Expense } from '../types/Expense';
import { format } from 'date-fns';
import MonthlyExpenseGroup from './MonthlyExpenseGroup';

const Expenses: React.FC = () => {
  const { data: expenses = [], isLoading, isError } = useGetExpensesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [addExpense] = useAddExpenseMutation();

  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    categoryId: '',
    paymentId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        categoryId: parseInt(formData.categoryId),
        paymentId: parseInt(formData.paymentId),
        date: new Date(formData.date).toISOString()
      }).unwrap();

      setFormData({
        amount: '',
        date: '',
        description: '',
        categoryId: '',
        paymentId: ''
      });
    } catch (err) {
      console.error('Failed to add expense', err);
    }
  };

  const categoryMap = categories.reduce((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {} as Record<number, string>);

  const groupExpensesByMonth = (expenses: Expense[]) => {
    const grouped: Record<string, Expense[]> = {};
    expenses.forEach((expense) => {
      const monthKey = format(new Date(expense.date), 'MMMM yyyy');
      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(expense);
    });
    return grouped;
  };

  const expensesByMonth = groupExpensesByMonth(expenses);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Expenses
      </Typography>

      {/* Add Expense Form */}
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            size="small"
            value={formData.amount}
            onChange={handleChange}
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            size="small"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="Category"
            name="categoryId"
            select
            size="small"
            value={formData.categoryId}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Payment"
            name="paymentId"
            select
            size="small"
            value={formData.paymentId}
            onChange={handleChange}
          >
            <MenuItem value="1">Debit</MenuItem>
            <MenuItem value="2">Credit</MenuItem>
            <MenuItem value="3">Cash</MenuItem>
          </TextField>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Stack>
      </form>

      {/* Expense Table */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography color="error">Failed to load expenses.</Typography>
        </Box>
      ) : (
        Object.entries(expensesByMonth).map(([month, monthExpenses]) => (
          <MonthlyExpenseGroup
            key={month}
            month={month}
            expenses={monthExpenses}
            categoryMap={categoryMap}
          />
        ))
      )}
    </Box>
  );
};

export default Expenses;
