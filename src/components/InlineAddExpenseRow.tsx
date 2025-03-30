import React from 'react';
import {
  TableCell,
  TableRow,
  TextField,
  Button,
  MenuItem
} from '@mui/material';

interface Props {
  formData: {
    amount: string;
    date: string;
    description: string;
    categoryId: string;
    paymentId: string;
  };
  selectedMonth: string;
  selectedYear: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const InlineAddExpenseRow: React.FC<Props> = ({
  formData,
  selectedMonth,
  selectedYear,
  onInputChange,
  onSelectChange,
  onSubmit
}) => {
  console.log('seelctedMonth', selectedMonth)
  console.log('seelctedYear', selectedYear)
  return (
    <TableRow
      hover
      sx={{
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: '#f0f0f0'
        }
      }}
    >
      <TableCell>
        <TextField
          name="date"
          type="date"
          size="small"
          value={formData.date}
          onChange={onInputChange}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          fullWidth
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="description"
          placeholder="Description"
          size="small"
          value={formData.description}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="amount"
          type="number"
          placeholder="0.00"
          size="small"
          value={formData.amount}
          onChange={onInputChange}
          fullWidth
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="paymentId"
          select
          size="small"
          value={formData.paymentId}
          onChange={onSelectChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="1">Debit</MenuItem>
          <MenuItem value="2">Credit</MenuItem>
          <MenuItem value="3">Cash</MenuItem>
        </TextField>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" size="small" type="submit" onClick={onSubmit}>
          Add
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InlineAddExpenseRow;
