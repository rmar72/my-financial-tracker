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
<TableContainer
  component={Paper}
  sx={{
    // backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.05), -1px -1px 3px rgba(255,255,255,0.6)',
    overflow: 'hidden'
  }}
>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow
              key={expense.id}
              hover
              sx={{
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#f7f7f7'
                }
              }}
            >
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.description || '-'}</TableCell>
                <TableCell>${Number(expense.amount).toFixed(2)}</TableCell>
                <TableCell>{expense.payment.type}</TableCell>
                <TableCell align="center">
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
