import React from 'react';
import {
  Stack,
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  categories: { id: number; name: string }[];
}

const AddExpenseForm: React.FC<Props> = ({ formData, onChange, onSubmit, categories }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          size="small"
          value={formData.amount}
          onChange={onChange}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={onChange}
        />
        <TextField
          label="Description"
          name="description"
          size="small"
          value={formData.description}
          onChange={onChange}
        />
        <TextField
          label="Category"
          name="categoryId"
          select
          size="small"
          value={formData.categoryId}
          onChange={onChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Payment"
          name="paymentId"
          select
          size="small"
          value={formData.paymentId}
          onChange={onChange}
        >
          <MenuItem value="1">Debit</MenuItem>
          <MenuItem value="2">Credit</MenuItem>
          <MenuItem value="3">Cash</MenuItem>
        </TextField>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Stack>
    </form>
  );
};

export default AddExpenseForm;
