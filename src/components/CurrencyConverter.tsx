import React, { useState } from 'react';
import { convertCurrency } from '../api/currencyApi';
import { formatCurrency } from '../utils/formatCurrency';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

interface ConversionHistory {
  from: string;
  to: string;
  amount: number;
  convertedValue: string;
}

interface Currency {
  value: string;
  label: string;
  symbol: string;
  symbol_first: boolean;
  thousands_separator: string;
  precision: number;
}

const MAX_HISTORY = 5;

const CurrencyConverter: React.FC<{ 
  fromCurrency: string; 
  toCurrency: string; 
  currencies: Currency[]; 
  onConversion: (historyUpdater: (prevHistory: ConversionHistory[]) => ConversionHistory[]) => void 
}> = ({
  fromCurrency,
  toCurrency,
  currencies,
  onConversion
}) => {
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

        onConversion((prevHistory: ConversionHistory[]) => {
          const updatedHistory = [
            { from: fromCurrency, to: toCurrency, amount: parseFloat(amount), convertedValue: formattedAmount },
            ...prevHistory,
          ];
          return updatedHistory.slice(0, MAX_HISTORY);
        });
      }
    } catch (error) {
      console.error('Error converting currency:', error);
      alert('Failed to convert currency');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Currency Converter
      </Typography>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ mb: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConvert}
        disabled={loading}
        sx={{
          mb: 3,
          fontWeight: 'bold',
          borderRadius: 2,
          boxShadow: 3,
          '&:hover': { boxShadow: 6 },
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Convert'}
      </Button>
      {convertedAmount !== null && (
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: 'white', 
            borderRadius: 3, 
            boxShadow: 3, 
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Converted Amount:
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ fontWeight: 'bold', color: 'text.primary'}}
          >
            {convertedAmount}
          </Typography>
        </Box>
      )}

    </Box>
  );
};

export default CurrencyConverter;
