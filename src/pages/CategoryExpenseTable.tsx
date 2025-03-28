import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Expense } from '../types/Expense';

interface Props {
  categoryId: number;
  categoryName: string;
  expenses: Expense[];
}

const CategoryExpenseTable: React.FC<Props> = ({ categoryId, categoryName, expenses }) => {
  return (
    <Box key={categoryId} mb={2}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {categoryName}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Payment ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>${Number(expense.amount).toFixed(2)}</TableCell>
                <TableCell>{expense.description || '-'}</TableCell>
                <TableCell>{expense.paymentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryExpenseTable;
