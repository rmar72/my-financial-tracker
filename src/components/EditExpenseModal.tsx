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
  const [errors, setErrors] = useState<Partial<typeof form>>({});
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

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
  
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.categoryId) newErrors.categoryId = 'Category is required';
    if (!form.paymentId) newErrors.paymentId = 'Payment method is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
  
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
          <TextField
            name="amount"
            label="Amount"
            value={form.amount}
            onChange={handleChange}
            error={!!errors.amount}
            helperText={errors.amount}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
            error={!!errors.date}
            helperText={errors.date}          
          />
          <TextField
            name="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            name="categoryId"
            label="Category"
            select
            value={form.categoryId}
            onChange={handleChange}
            error={!!errors.categoryId}
            helperText={errors.categoryId}
          >
            {categories.map(c => (
              <MenuItem key={c.id} value={c.id.toString()}>{c.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            name="paymentId"
            label="Payment"
            select
            value={form.paymentId}
            onChange={handleChange}
            error={!!errors.paymentId}
            helperText={errors.paymentId}
          >
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
