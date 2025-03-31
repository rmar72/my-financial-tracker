import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
  Paper
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import { useGetCategoriesQuery, useUpdateCategoryMutation } from '../features/api/expensesApi';

export default function Categories() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [editId, setEditId] = useState<number | null>(null);
  const [formState, setFormState] = useState<{ name: string; budgetAmount: string }>({ name: '', budgetAmount: '' });

  const [updateCategory] = useUpdateCategoryMutation();

  const handleEditClick = (category: { id: number; name: string; budgetAmount: number | null }) => {
    setEditId(category.id);
    setFormState({
      name: category.name,
      budgetAmount: category.budgetAmount?.toString() ?? ''
    });
  };

  const handleSave = async () => {
    if (!editId) return;
    await updateCategory({
      id: editId,
      data: {
        name: formState.name,
        budgetAmount: formState.budgetAmount === '' ? null : Number(formState.budgetAmount)
      }
    });
    setEditId(null);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>Categories</Typography>
      <Stack spacing={2}>
        {categories?.map((cat) => (
          <Paper key={cat.id} sx={{ p: 2 }}>
            {editId === cat.id ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <TextField
                  label="Budget"
                  type="number"
                  value={formState.budgetAmount}
                  onChange={(e) => setFormState({ ...formState, budgetAmount: e.target.value })}
                />
                <Button variant="contained" onClick={handleSave}>Save</Button>
                <Button onClick={() => setEditId(null)}>Cancel</Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Typography>{cat.name}</Typography>
                <Typography color="text.secondary">
                  {cat.budgetAmount ? `$${cat.budgetAmount}` : 'No budget'}
                </Typography>
                <IconButton onClick={() => handleEditClick(cat)}>
                  <Edit />
                </IconButton>
              </Stack>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
