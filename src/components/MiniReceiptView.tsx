import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, TextField, MenuItem, Grid } from '@mui/material';
import { SharedContribution } from '../types/SharedContribution';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface Props {
  contributions: SharedContribution[];
  grossAmount: number;
  onCollapse?: () => void;
}

const MiniReceiptView: React.FC<Props> = ({ contributions, grossAmount, onCollapse }) => {
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
        marginTop: 0,
        marginBottom: 2
      }}
    >
      <Box
        sx={{
          backgroundColor: '#e0f2f1',
          padding: '6px 12px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.85rem',
          color: '#00695c',
          display: 'inline-block',
          mb: 2
        }}
      >
        Gross Amount: ${grossAmount.toFixed(2)}
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
                sx: {
                  fontSize: '0.8rem',
                  height: 36,
                  padding: '6px 10px'
                }
              },
              inputLabel: {
                sx: {
                  fontSize: '0.93rem',
                  top: '-4px'
                }
              }
            }}
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
            slotProps={{
              input: {
                sx: {
                  fontSize: '0.8rem',
                  height: 36,
                  padding: '6px 10px'
                }
              },
              inputLabel: {
                sx: {
                  fontSize: '0.93rem',
                  top: '-4px'
                }
              }
            }}
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
            slotProps={{
              input: {
                sx: {
                  fontSize: '0.8rem',
                  height: 36,
                  padding: '6px 10px'
                }
              },
              inputLabel: {
                sx: {
                  fontSize: '0.93rem',
                  top: '-4px'
                }
              }
            }}
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
                  fullWidth: true,
                  slotProps: {
                    input: {
                      sx: {
                        fontSize: '0.8rem',
                        height: 36,
                        padding: '6px 10px'
                      }
                    },
                    inputLabel: {
                      sx: {
                        fontSize: '0.8rem',
                        top: '-4px'
                      }
                    }
                  }
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
      
        <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            size="small"
            onClick={handleSave}
            sx={{
              backgroundColor: 'transparent',
              color: 'green',
              border: '1px solid green',
              width: 32,
              height: 32,
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
              width: 32,
              height: 32,
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
