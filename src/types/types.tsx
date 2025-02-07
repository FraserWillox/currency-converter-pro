// Types for fetchCurrencies response
export interface CurrencyListResponse {
    response: {
      [key: string]: {
        name: string;
        short_code: string;
        symbol: string;
        symbol_first: boolean;
        thousands_separator: string;
        precision: number;
      };
    };
  }
  
  // Types for convertCurrency response
  export interface ConversionResponse {
    response: {
      value: number;
    };
  }
  