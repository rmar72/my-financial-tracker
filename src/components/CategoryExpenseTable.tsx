import React, { useState } from 'react';
import {
  Box,
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
import EditIcon from '@mui/icons-material/Edit';
import EditExpenseModal from './EditExpenseModal';
import { useUpdateExpenseMutation } from '../features/api/expensesApi';
interface Props {
  categoryId: number;
  expenses: Expense[];
  categories: { id: number; name: string }[];
}

const CategoryExpenseTable: React.FC<Props> = ({ categoryId, expenses, categories }) => {
  const [deleteExpense] = useDeleteExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleUpdate = (data: Partial<Expense>) => {
    if (editingExpense) {
      updateExpense({ id: editingExpense.id, data });
    }
  };


  return (
    <Box key={categoryId} mb={2}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment ID</TableCell>
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
                  <IconButton size="small" onClick={() => handleEdit(expense)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={() => deleteExpense(expense.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditExpenseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={editingExpense}
        categories={categories}
      />
    </Box>
  );
};

export default CategoryExpenseTable;
