import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import CurrencyConverter from './components/CurrencyConverter';
import RecentConversions from './components/RecentConversions';
import CurrencySelector from './components/CurrencySelector';
import { fetchCurrencies } from './api/currencyApi';
import { styled } from '@mui/system';

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

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  padding-top: 4rem; 
  padding-bottom: 3rem; 
  max-width: 100% !important;
`;

const PaperStyled = styled(Paper)`
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  background-color: background.paper;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
  margin-bottom: 2rem;
`;

const FooterBox = styled(Box)`
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0.9;
`;

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
    <PageContainer>
        <PaperStyled
          elevation={6}
        >
         <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
        Currency Converter Pro
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary', textAlign: 'center' }}>
        Convert your currency in real time with up-to-date exchange rates. 
        Simply select your currencies and enter an amount to get instant conversion.
      </Typography>

      </PaperStyled>
      <PaperStyled
        elevation={6}
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
      </PaperStyled>
      <FooterBox>
        Created by <strong>Fraser Willox</strong>
      </FooterBox>
    </PageContainer>
  );
};

export default App;
