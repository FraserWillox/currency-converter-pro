import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import CurrencySelector from './components/CurrencySelector';
import CurrencyConverter from './components/CurrencyConverter';
import { fetchCurrencies } from './api/currencyApi';
import styled from '@emotion/styled';

const PageContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center; 
  justify-content: center;
  background-color:rgb(240, 240, 240); 
`;

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<
    { value: string; label: string; symbol: string; symbol_first: boolean; thousands_separator: string; precision: number }[]
  >([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  useEffect(() => {
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
    <PageContainer>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Currency Converter
        </Typography>
        <CurrencySelector label="From Currency" value={fromCurrency} onChange={setFromCurrency} options={currencies} />
        <CurrencySelector label="To Currency" value={toCurrency} onChange={setToCurrency} options={currencies} />
        <CurrencyConverter fromCurrency={fromCurrency} toCurrency={toCurrency} currencies={currencies} />
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="right">
            By Fraser Willox
          </Typography>
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default App;
