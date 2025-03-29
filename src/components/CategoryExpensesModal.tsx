import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Expense } from '../types/Expense';
import CategoryExpenseTable from './CategoryExpenseTable';

interface Props {
  open: boolean;
  onClose: () => void;
  categoryId: number;
  expenses: Expense[];
  categoryName?: string;
  categories: { id: number; name: string }[];
}

const CategoryExpensesModal: React.FC<Props> = ({
  open,
  onClose,
  categoryId,
  expenses,
  categoryName,
  categories
}) => {
  const fallbackName = `Category ${categoryId}`;
  const displayName =
    categoryName ||
    categories.find((c) => c.id === categoryId)?.name ||
    fallbackName;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle variant="h6" fontWeight="bold" fontSize={18}>
        {displayName} {} – Expenses
      </DialogTitle>
      <DialogContent dividers>
        <CategoryExpenseTable
          categoryId={categoryId}
          expenses={expenses}
          categories={categories}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryExpensesModal;
