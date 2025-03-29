import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import { useAddExpenseMutation, useGetCategoriesQuery } from '../features/api/expensesApi';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseDashboard from '../components/ExpenseDashboard';

const Expenses: React.FC = () => {
  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();
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

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Expenses
      </Typography>

      {loadingCategories ? (
        <CircularProgress />
      ) : (
        <AddExpenseForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          categories={categories}
        />
      )}

      <ExpenseDashboard />
    </Box>
  );
};

export default Expenses;
