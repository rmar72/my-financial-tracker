import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Stack,
  MenuItem
} from '@mui/material';

import { useGetExpensesQuery, useAddExpenseMutation, useGetCategoriesQuery } from '../features/api/expensesApi';
import { Expense } from '../types/Expense';

const Expenses: React.FC = () => {
  const { data: expenses, isLoading, isError } = useGetExpensesQuery();
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
            label="Payment ID"
            name="paymentId"
            select
            size="small"
            value={formData.paymentId}
            onChange={handleChange}
          >
            <MenuItem value="1">Debit</MenuItem>
            <MenuItem value="2">Credit</MenuItem>
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
      ) : isError || !expenses ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography color="error">Failed to load expenses.</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category ID</TableCell>
                <TableCell>Payment ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense: Expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>${Number(expense.amount).toFixed(2)}</TableCell>
                  <TableCell>{expense.description || '-'}</TableCell>
                  <TableCell>{categoryMap[expense.categoryId] || expense.categoryId}</TableCell>
                  <TableCell>{expense.paymentId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Expenses;
