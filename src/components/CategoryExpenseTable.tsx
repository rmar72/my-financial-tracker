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
import MiniReceiptView from './MiniReceiptView';

interface Props {
  categoryId: number;
  expenses: Expense[];
  categories: { id: number; name: string }[];
  selectedMonth: string;
  selectedYear: string,
}

const CategoryExpenseTable: React.FC<Props> = ({ categoryId, expenses, categories, selectedMonth, selectedYear }) => {
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

  const [expandedExpenseId, setExpandedExpenseId] = useState<number | null>(null);
  const handleExpand = (id: number) => {
    setExpandedExpenseId(prev => (prev === id ? null : id));
  };

  return (
    <Box key={categoryId} mb={2}>
      <TableContainer
        component={Paper}
        sx={{
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
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onSubmit={handleSubmit}
            />
            {expenses
              .slice()
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => {
                const contributionsAmount = expense.sharedContributions.reduce((acc: number, contr: {amount: number }) => acc += contr.amount, 0)
                return (
                <React.Fragment key={expense.id}>
                  <ExpenseRow
                    expense={expense}
                    onEdit={handleEdit}
                    onDelete={deleteExpense}
                    onExpand={handleExpand}
                    isExpanded={expandedExpenseId === expense.id}
                  />
                  {expandedExpenseId === expense.id && (
                    <TableRow sx={{ backgroundColor: '#f0f9ff' }}>
                      <TableCell colSpan={5} sx={{ borderBottom: 0, p: 0 }}>
                        <Box display="flex" alignItems="flex-start" mt={0.5} mb={2}>
                          {/* L-connector custom svg icon */}
                          <Box sx={{ ml: 1, mr: 1, mt: 1 }}>
                            <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 0V20H20" stroke="#bbb" strokeWidth="2" />
                            </svg>
                          </Box>
                          
                          <Box flex={1} sx={{ bgcolor: '#f0f9ff' }}>
                            <MiniReceiptView
                              contributions={expense.sharedContributions}
                              grossAmount={Number(expense.amount)}
                              netAmount={contributionsAmount ? Number(expense.amount - contributionsAmount) : 0}
                              contributionsAmount={Number(contributionsAmount)}
                              onCollapse={() => setExpandedExpenseId(null)}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
            )})}
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
