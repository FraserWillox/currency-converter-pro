import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const CurrencySelector: React.FC<Props> = ({ label, value, onChange, options }) => {
  return (
    <FormControl fullWidth sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          '&:hover': { bgcolor: 'action.hover' },
          '&.Mui-focused': { borderColor: 'primary.main' },
        }}
      >
        <MenuItem value="">Select a currency</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
