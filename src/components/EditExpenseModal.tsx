import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Stack, TextField, MenuItem
} from '@mui/material';
import { Expense } from '../types/Expense';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Expense>) => void;
  initialData: Expense | null;
  categories: { id: number; name: string }[];
}

const EditExpenseModal: React.FC<Props> = ({ open, onClose, onSubmit, initialData, categories }) => {
  const [form, setForm] = useState({
    amount: '',
    date: '',
    description: '',
    categoryId: '',
    paymentId: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount.toString(),
        date: initialData.date.slice(0, 10),
        description: initialData.description || '',
        categoryId: initialData.categoryId.toString(),
        paymentId: initialData.paymentId.toString()
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSubmit({
      amount: parseFloat(form.amount),
      date: new Date(form.date).toISOString(),
      description: form.description,
      categoryId: parseInt(form.categoryId),
      paymentId: parseInt(form.paymentId)
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField name="amount" label="Amount" value={form.amount} onChange={handleChange} />
          <TextField name="date" label="Date" type="date" InputLabelProps={{ shrink: true }} value={form.date} onChange={handleChange} />
          <TextField name="description" label="Description" value={form.description} onChange={handleChange} />
          <TextField name="categoryId" label="Category" select value={form.categoryId} onChange={handleChange}>
            {categories.map(c => (
              <MenuItem key={c.id} value={c.id.toString()}>{c.name}</MenuItem>
            ))}
          </TextField>
          <TextField name="paymentId" label="Payment" select value={form.paymentId} onChange={handleChange}>
            <MenuItem value="1">Debit</MenuItem>
            <MenuItem value="2">Credit</MenuItem>
            <MenuItem value="3">Cash</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseModal;
