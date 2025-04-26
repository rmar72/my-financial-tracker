import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,                                                                                                                 
  Button,
  Stack,
  TextField,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; amount: number }) => Promise<void>;
}

const AddCategoryModal: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: '', amount: '' });
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.amount || parseFloat(form.amount) <= 0)
      newErrors.amount = 'Amount must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await onSubmit({
        name: form.name.trim(),
        amount: parseFloat(form.amount),
      });
      setForm({ name: '', amount: '' }); // clear form
      setErrors({});
      onClose();
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            name="name"
            label="Category Name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            error={!!errors.amount}
            helperText={errors.amount}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
