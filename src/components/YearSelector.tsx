import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Props {
  years: string[];
  selectedYear: string;
  onChange: (year: string) => void;
}

const YearSelector: React.FC<Props> = ({ years, selectedYear, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box mb={2} width={150} sx={{ ml: '30px' }}>
      <FormControl
        fullWidth
        size="small"
        sx={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: 'inset 0 0px 0 1px rgba(0,0,0,0.05), 4px 4px 5px rgba(14, 12, 12, 0.05)',
          '& .MuiInputBase-root': {
            borderRadius: '10px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
      >
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          value={selectedYear}
          label="Year"
          onChange={handleChange}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year} >
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default YearSelector;
