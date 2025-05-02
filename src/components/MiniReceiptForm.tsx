import React from 'react';
import {
  Grid, TextField, IconButton, Box, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCardIcon from '@mui/icons-material/AddCard';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

interface Props {
  form: {
    contributor: string;
    amount: string;
    method: string;
    date: Date;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date | null) => void;
  onSave: () => void;
  onCancel: () => void;
}

const MiniReceiptForm: React.FC<Props> = ({
  form,
  onChange,
  onDateChange,
  onSave,
  onCancel
}) => (
  <Grid container spacing={2} alignItems="center" mt={0}>
    <Grid size={{ xs: 12, sm: 3 }}>
      <TextField
        label="Contributor"
        name="contributor"
        value={form.contributor}
        onChange={onChange}
        size="small"
        fullWidth
        slotProps={{
          input: {
            sx: { fontSize: '1rem', height: 36, pl: '30px' },
            startAdornment: (
              <Box sx={{ color: 'grey', position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                <PermIdentityIcon fontSize="small" sx={{ mt: 0.5 }} />
              </Box>
            )
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
        onChange={onChange}
        size="small"
        fullWidth
        slotProps={{
          input: {
            sx: { fontSize: '1rem', height: 36, pl: '28px' },
            startAdornment: (
              <Box sx={{ color: 'green', position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                <AttachMoneyIcon fontSize="small" sx={{ mt: 0.5 }} />
              </Box>
            )
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
        onChange={onChange}
        size="small"
        fullWidth
        slotProps={{
          input: {
            sx: { fontSize: '1rem', height: 36, pl: '34px' },
            startAdornment: (
              <Box sx={{ color: 'grey', position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                <AddCardIcon fontSize="small" sx={{ mt: 0.5 }} />
              </Box>
            )
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
          onChange={onDateChange}
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
              sx: {
                width: 150,
                '& .MuiInputBase-root': {
                  height: 36
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
        onClick={onSave}
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
        onClick={onCancel}
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
);

export default MiniReceiptForm;
