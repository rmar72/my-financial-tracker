import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Expense } from '../types/Expense';
import GroupsIcon from '@mui/icons-material/Groups';

interface Props {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
  onExpand: (id: number) => void;
  isExpanded: boolean;
}

const ExpenseRow: React.FC<Props> = ({ expense, onEdit, onDelete, onExpand, isExpanded }) => {
  return (
    <TableRow
      hover
      sx={{
        transition: 'background-color 0.2s ease',
        backgroundColor: isExpanded ? '#f0f9ff' : 'inherit',
        '&:hover': {
          backgroundColor: isExpanded ? '#f0f9ff' : '#f7f7f7'
        },
        '& td': {
          borderBottom: isExpanded ? 'none' : undefined,
          mb: isExpanded ? '10px' : 0
        },
        mb: isExpanded ? '10px' : 0
      }}
    >
      <TableCell>
        {new Date(expense.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
      </TableCell>
      <TableCell>
        {expense.description || '-'}
      </TableCell>
      <TableCell sx={{ fontSize: '0.80rem', minWidth: 150 }}>
        {expense.isShared ? (
          <>
            ${Number(expense.netAmount).toFixed(2)} of ${Number(expense.amount).toFixed(2)}{' '}
            <GroupsIcon sx={{ fontSize: 25, ml: 1.5, mb: 0, pb: 0.4, verticalAlign: 'middle', color: 'primary.main' }} />
          </>
        ) : (
          <>${Number(expense.amount).toFixed(2)}</>
        )}
      </TableCell>
      <TableCell>
        {expense.payment.type}
      </TableCell>
      <TableCell align="center">
        <Box display="flex" justifyContent="center" gap={1}>
          <IconButton size="small" onClick={() => onEdit(expense)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(expense.id)}>
            <DeleteOutlineRoundedIcon color="error" fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onExpand(expense.id)}>
            {!expense.isShared ? <AddIcon fontSize="small" /> : isExpanded ? '▲' : '▼'}
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
