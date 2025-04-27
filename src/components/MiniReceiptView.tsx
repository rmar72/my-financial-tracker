import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, TextField, MenuItem, Grid } from '@mui/material';
import { SharedContribution } from '../types/SharedContribution';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Props {
  contributions: SharedContribution[];
  grossAmount: number;
}

const MiniReceiptView: React.FC<Props> = ({ contributions, grossAmount }) => {
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
    setEditMode(false);
    setForm({
      contributor: '',
      amount: '',
      method: '',
      date: new Date()
    });
  };

  const handleSave = () => {
    console.log('Saving contribution:', form);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fafafa',
        padding: 2,
        borderRadius: 2,
        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.1)',
        marginTop: 1,
        marginBottom: 2
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        Gross Amount: ${grossAmount.toFixed(2)}
      </Typography>

      {editMode ? (
        <Grid container spacing={2} alignItems="center" mt={1}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Contributor"
              name="contributor"
              value={form.contributor}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <TextField
              label="Method"
              name="method"
              select
              value={form.method}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Venmo">Venmo</MenuItem>
              <MenuItem value="CashApp">CashApp</MenuItem>
              <MenuItem value="Zelle">Zelle</MenuItem>
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
                    fullWidth: true
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={handleSave}>
              Save
            </Button>
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
