import axios from 'axios';
import { CurrencyListResponse, ConversionResponse } from '../types/types';

const API_BASE_URL = 'https://api.currencybeacon.com/v1';
const API_KEY = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;

// Fetch available currencies
export const fetchCurrencies = async (): Promise<CurrencyListResponse['response']> => {
  const response = await axios.get<CurrencyListResponse>(
    `${API_BASE_URL}/currencies?api_key=${API_KEY}`
  );
  console.log('Currencies API Response:', response.data);
  return response.data.response;
};

// Convert currency
export const convertCurrency = async (
  from: string,
  to: string,
  amount: number
): Promise<ConversionResponse['response']> => {
  const response = await axios.get<ConversionResponse>(
    `${API_BASE_URL}/convert?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`
  );
  return response.data.response;
};
