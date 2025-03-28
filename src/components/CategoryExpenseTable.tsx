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
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteExpenseMutation } from '../features/api/expensesApi';

interface Props {
  categoryId: number;
  categoryName: string;
  expenses: Expense[];
}

const CategoryExpenseTable: React.FC<Props> = ({ categoryId, categoryName, expenses }) => {
  const [deleteExpense] = useDeleteExpenseMutation();

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
                <TableCell>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryExpenseTable;
