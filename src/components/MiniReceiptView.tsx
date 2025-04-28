import React, { useState, useEffect } from 'react';
import { Box, Stack, Button, TextField, MenuItem, Grid, Divider } from '@mui/material';
import { SharedContribution } from '../types/SharedContribution';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCardIcon from '@mui/icons-material/AddCard';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useGetExpensesQuery, useUpdateExpenseMutation, useAddSharedContributionMutation } from '../features/api/expensesApi';

interface Props {
  contributions: SharedContribution[];
  grossAmount: number;
  netAmount: number;
  contributionsAmount: number;
  onCollapse: () => void;
  expenseId: number;
}

const MiniReceiptView: React.FC<Props> = ({ contributions, grossAmount, netAmount, contributionsAmount, onCollapse, expenseId }) => {
  const [addSharedContribution] = useAddSharedContributionMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const { refetch } = useGetExpensesQuery();
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    contributor: '',
    amount: '',
    method: '',
    date: new Date()
  });

  useEffect(() => {
    if (contributions.length === 0) {
      setEditMode(true);
    }
  }, [contributions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setForm({ ...form, date: newDate });
    }
  };

  const handleCancel = () => {
    onCollapse();
    setEditMode(false);
    setForm({
      contributor: '',
      amount: '',
      method: '',
      date: new Date()
    });
  };


  const handleSave = async () => {
    try {
      await addSharedContribution({
        contributor: form.contributor,
        amount: parseFloat(form.amount),
        method: form.method,
        date: form.date.toISOString(),
        expenseId
      }).unwrap();

      await updateExpense({
        id: expenseId,
        data: { isShared: true }
      }).unwrap();

      setEditMode(false);
      setForm({
        contributor: '',
        amount: '',
        method: '',
        date: new Date()
      });

      await refetch();
    } catch (err) {
      console.error('Failed to save contribution or update expense', err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fafafa',
        padding: 2,
        borderRadius: 2,
        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.1)',
        marginTop: 0,
        marginBottom: 2,
        mr: 1,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            backgroundColor: '#C9E4DE',
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#00695c',
            display: 'inline-block',
            mb: 2,
          }}
        >
          Gross Amount: ${grossAmount.toFixed(2)}
        </Box>
        <Box
          sx={{
            backgroundColor: '#C6DEF1',
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#00695c',
            display: 'inline-block',
            mb: 2,
            ml: 2
          }}
        >
          Net Amount: {netAmount ? `$ ${netAmount.toFixed(2)}` : 'N/A'}
        </Box>
        <Box
          sx={{
            backgroundColor: '#FAEDCB',
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#00695c',
            display: 'inline-block',
            mb: 2,
            ml: 2,
          }}
        >
          Contributions Amount: {contributionsAmount ? `$ ${contributionsAmount.toFixed(2)}` : 'N/A'}
        </Box>
        <Divider sx={{ mt: "-5px", mb: 2.5 }} />
      </Box>

      {editMode ? (
        <Grid container spacing={2} alignItems="center" mt={0}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Contributor"
              name="contributor"
              value={form.contributor}
              onChange={handleChange}
              size="small"
              fullWidth
              slotProps={{
                input: {
                  sx: { fontSize: '1rem', height: 36, pl: '30px' },
                  startAdornment: (
                    <Box sx={{ color: 'grey', fontSize: '1rem', position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                      <PermIdentityIcon fontSize="small" sx={{ mt: 0.5 }} />
                    </Box>
                  )
                },
                inputLabel: {
                  sx: { fontSize: '1rem', top: '-4px' }
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 2.2 }}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              size="small"
              fullWidth
              slotProps={{
                input: {
                  sx: { fontSize: '1rem', height: 36, pl: '28px' },
                  startAdornment: (
                    <Box sx={{ color: 'green', fontSize: '1rem', position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                      <AttachMoneyIcon fontSize="small" sx={{ mt: 0.5 }} />
                    </Box>
                  )
                },
                inputLabel: {
                  sx: { fontSize: '1rem', top: '-4px' }
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 2.5 }}>
            <TextField
              label="Method"
              name="method"
              select
              value={form.method}
              onChange={handleChange}
              size="small"
              fullWidth
              slotProps={{
                input: {
                  sx: { fontSize: '1rem', height: 36, pl: '34px' },
                  startAdornment: (
                    <Box sx={{ color: 'grey', fontSize: '1rem', position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                      <AddCardIcon fontSize="small" sx={{ mt: 0.5 }} />
                    </Box>
                  )
                },
                inputLabel: {
                  sx: { fontSize: '1rem', top: '-4px' }
                }
              }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Zelle">Zelle</MenuItem>
              <MenuItem value="Venmo">Venmo</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={form.date}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    sx: {
                      width: 150,
                      '& .MuiInputBase-root': {
                        height: 36
                      }
                    },
                    slotProps: {
                      input: {
                        sx: { fontSize: '0.95rem', pl: 1 }
                      },
                      inputLabel: {
                        sx: { fontSize: '1rem', top: '-4px' }
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ xs: 12, sm: 1 }} sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
            <IconButton
              size="small"
              onClick={handleSave}
              sx={{
                backgroundColor: 'transparent',
                color: 'green',
                border: '1px solid green',
                width: 30,
                height: 30,
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleCancel}
              sx={{
                backgroundColor: 'transparent',
                color: 'red',
                border: '1px solid red',
                width: 30,
                height: 30,
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={1}>
          {contributions.map((contrib) => (
            <Box key={contrib.id} sx={{ fontSize: 14, color: 'grey.800' }}>
              {contrib.contributor} paid ${Number(contrib.amount).toFixed(2)} via {contrib.method} on {new Date(contrib.date).toLocaleDateString('en-US')}
            </Box>
          ))}

          <Box mt={2}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default MiniReceiptView;
