import React from 'react';
import {
  TableCell,
  TableRow,
  TextField,
  Button,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { parse, format } from 'date-fns';
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

  const monthIndex = new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth();

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            name="date"
            value={formData.date ? parse(formData.date, 'yyyy-MM-dd', new Date()) : null}
            onChange={(newValue) => {
              if (newValue) {
                const formatted = format(newValue, 'yyyy-MM-dd');
                onInputChange({
                  target: {
                    name: 'date',
                    value: formatted,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
            minDate={new Date(Number(selectedYear), monthIndex, 1)}
            maxDate={new Date(Number(selectedYear), monthIndex + 1, 0)} // last day of month
            openTo='day'            
            views={['year', 'month', 'day']}
            label={`Select date`}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                variant: 'outlined',
              }
            }}
            displayWeekNumber
          />
        </LocalizationProvider>
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
