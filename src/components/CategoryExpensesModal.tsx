import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import { Expense } from '../types/Expense';
import CategoryExpenseTable from './CategoryExpenseTable';

interface Props {
  open: boolean;
  onClose: () => void;
  categoryId: number;
  expenses: Expense[];
  categoryName?: string;
  categories: { id: number; name: string; budgetAmount: string; }[];
  selectedMonth: string;
  selectedYear: string;
}

const CategoryExpensesModal: React.FC<Props> = ({
  open,
  onClose,
  categoryId,
  expenses,
  categoryName,
  categories,
  selectedMonth,
  selectedYear,
}) => {
  const fallbackName = `Category ${categoryId}`;
  const displayName =
    categoryName ||
    categories.find((c) => c.id === categoryId)?.name ||
    fallbackName;

  const categoryBudget = categories.find((c) => c.id === categoryId)?.budgetAmount || 0;
  const categoryTotal = expenses
    .filter(e => e.categoryId === categoryId)
    .reduce((sum, e) => {
      const isShared = e.isShared && typeof e.netAmount === 'number';
      return sum + Number(isShared ? e.netAmount : e.amount);
    }, 0);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px',
          }
        }
      }}
    >
      <DialogTitle variant="h6" fontWeight="bold" fontSize={18}>
        {displayName} {} – Expenses
      </DialogTitle>
      
      <DialogContent dividers>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              backgroundColor: '#FFF3E0',
              color: '#E65100',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Total: ${categoryTotal.toFixed(2)}
          </Box>
          <Box
            sx={{
              backgroundColor: '#E0F7FA',
              color: '#006064',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Budget: ${Number(categoryBudget).toFixed(2)}
          </Box>
        </Stack>
        <CategoryExpenseTable
          categoryId={categoryId}
          expenses={expenses}
          categories={categories}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
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
