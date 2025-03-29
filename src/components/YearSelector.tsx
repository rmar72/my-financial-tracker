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
    <Box mb={2} width={150}>
      <FormControl fullWidth size="small">
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          value={selectedYear}
          label="Year"
          onChange={handleChange}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default YearSelector;
