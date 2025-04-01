import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Expense } from '../types/Expense';

interface Props {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseRow: React.FC<Props> = ({ expense, onEdit, onDelete }) => {
  return (
    <TableRow
      hover
      sx={{
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: '#f7f7f7'
        }
      }}
    >
      <TableCell>{new Date(expense.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</TableCell>
      <TableCell>{expense.description || '-'}</TableCell>
      <TableCell>${Number(expense.amount).toFixed(2)}</TableCell>
      <TableCell>{expense.payment.type}</TableCell>
      <TableCell align="center">
        <IconButton size="small" onClick={() => onEdit(expense)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton color="error" size="small" onClick={() => onDelete(expense.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
