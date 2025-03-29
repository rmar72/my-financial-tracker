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
import {
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
  useAddExpenseMutation
} from '../features/api/expensesApi';
import EditExpenseModal from './EditExpenseModal';
import InlineAddExpenseRow from './InlineAddExpenseRow';
import ExpenseRow from './ExpenseRow';

interface Props {
  categoryId: number;
  expenses: Expense[];
  categories: { id: number; name: string }[];
}

const CategoryExpenseTable: React.FC<Props> = ({ categoryId, expenses, categories }) => {
  const [deleteExpense] = useDeleteExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [addExpense] = useAddExpenseMutation();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    categoryId: categoryId.toString(),
    paymentId: ''
  });

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleUpdate = (data: Partial<Expense>) => {
    if (editingExpense) {
      updateExpense({ id: editingExpense.id, data });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData({ ...formData, [name]: value });
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
        categoryId: categoryId.toString(),
        paymentId: ''
      });
    } catch (err) {
      console.error('Failed to add expense', err);
    }
  };

  return (
    <Box key={categoryId} mb={2}>
      <TableContainer
        component={Paper}
        sx={{
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
            <InlineAddExpenseRow
              formData={formData}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onSubmit={handleSubmit}
            />

            {expenses
              .slice()
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  onEdit={handleEdit}
                  onDelete={deleteExpense}
                />
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
