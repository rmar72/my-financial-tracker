import React from 'react';
import {
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import { useGetCategoriesQuery } from '../features/api/expensesApi';
import ExpenseDashboard from '../components/ExpenseDashboard';

const Expenses: React.FC = () => {
  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();


  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: '20px' }}>
        Expenses Overview
      </Typography>

      {loadingCategories ? (
        <CircularProgress />
      ) : (
        <ExpenseDashboard categories={categories} />
      )}
    </Box>
  );
};

export default Expenses;
