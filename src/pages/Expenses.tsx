import React from 'react';
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
  Paper
} from '@mui/material';
import { useGetExpensesQuery } from '../features/api/expensesApi';
import { Expense } from '../types/Expense';

const Expenses: React.FC = () => {
  const { data: expenses, isLoading, isError } = useGetExpensesQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !expenses) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Failed to load expenses.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Expenses
      </Typography>
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
                <TableCell>{expense.categoryId}</TableCell>
                <TableCell>{expense.paymentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Expenses;
