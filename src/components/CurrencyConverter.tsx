import React, { useState } from 'react';
import { convertCurrency } from '../api/currencyApi';
import { formatCurrency } from '../utils/formatCurrency';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

interface Props {
  fromCurrency: string;
  toCurrency: string;
  currencies: { value: string; symbol: string; symbol_first: boolean; thousands_separator: string; precision: number }[];
}

const CurrencyConverter: React.FC<Props> = ({ fromCurrency, toCurrency, currencies }) => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      alert('Please select currencies and enter an amount');
      return;
    }

    try {
      setLoading(true);
      const result = await convertCurrency(fromCurrency, toCurrency, parseFloat(amount));

      const toCurrencyData = currencies.find((currency) => currency.value === toCurrency);
      if (toCurrencyData) {
        const formattedAmount = formatCurrency(
          result.value,
          toCurrencyData.symbol,
          toCurrencyData.symbol_first,
          toCurrencyData.thousands_separator,
          toCurrencyData.precision
        );
        setConvertedAmount(formattedAmount);
      }
    } catch (error) {
      console.error('Error converting currency:', error);
      alert('Failed to convert currency');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConvert}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Convert'}
      </Button>
      {convertedAmount !== null && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="h6" color="success.dark">
            Converted Amount: {convertedAmount}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CurrencyConverter;
