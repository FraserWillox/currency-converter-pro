export const formatCurrency = (
    amount: number,
    symbol: string,
    symbolFirst: boolean,
    thousandsSeparator: string,
    precision: number
  ): string => {
    // Ensure the number has the correct precision
    const [integerPart, decimalPart] = amount.toFixed(precision).split('.');
  
    // Add thousands separator to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
    // Combine the integer and decimal parts with the correct decimal mark
    const formattedAmount = decimalPart
      ? `${formattedInteger}${thousandsSeparator === ',' ? '.' : ','}${decimalPart}`
      : formattedInteger;
  
    // Return formatted currency with symbol placement
    return symbolFirst ? `${symbol}${formattedAmount}` : `${formattedAmount}${symbol}`;
  };
  
  