import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import CurrencyConverter from './components/CurrencyConverter';
import RecentConversions from './components/RecentConversions';
import CurrencySelector from './components/CurrencySelector';
import { fetchCurrencies } from './api/currencyApi';

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

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);

  React.useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchCurrencies();
        const currencyOptions = Object.keys(data).map((key) => ({
          value: data[key].short_code,
          label: `${data[key].short_code} - ${data[key].name}`,
          symbol: data[key].symbol,
          symbol_first: data[key].symbol_first,
          thousands_separator: data[key].thousands_separator,
          precision: data[key].precision,
        }));
        setCurrencies(currencyOptions);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };
    loadCurrencies();
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' , paddingTop: 4, paddingBottom: 4, maxWidth: '100% !important' }}>
            <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '90%',
          maxWidth: 900,
          bgcolor: 'background.paper',
          boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
          marginBottom: 4
        }}
      >
         <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
        Currency Converter Pro
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 4, color: 'text.secondary', textAlign: 'center' }}>
        Convert your currency in real time with up-to-date exchange rates. 
        Simply select your currencies and enter an amount to get instant conversion.
      </Typography>

      </Paper>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '90%',
          maxWidth: 900,
          bgcolor: 'background.paper',
          boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
        }}
      >
     
        <Grid container spacing={4}>
          {/* Left Panel - Currency Converter */}
          <Grid item xs={12} md={6}>
            <CurrencySelector label="From Currency" value={fromCurrency} onChange={setFromCurrency} options={currencies} />
            <CurrencySelector label="To Currency" value={toCurrency} onChange={setToCurrency} options={currencies} />
            <CurrencyConverter fromCurrency={fromCurrency} toCurrency={toCurrency} currencies={currencies} onConversion={setConversionHistory} />
          </Grid>

          {/* Right Panel - Recent Conversions */}
          <Grid item xs={12} md={6}>
            <RecentConversions history={conversionHistory} />
          </Grid>
        </Grid>
      </Paper>
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 20,
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.8)',
          opacity: 0.9,
        }}
      >
        Created by <strong>Fraser Willox</strong>
      </Box>
    </Container>
  );
};

export default App;
