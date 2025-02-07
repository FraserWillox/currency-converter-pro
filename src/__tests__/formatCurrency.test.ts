import { formatCurrency } from '../utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats currency with symbol first', () => {
    const result = formatCurrency(1234567.89, '$', true, ',', 2);
    expect(result).toBe('$1,234,567.89');
  });

  it('formats currency with symbol last', () => {
    const result = formatCurrency(1234567.89, '€', false, '.', 2);
    expect(result).toBe('1.234.567,89€');
  });

  it('handles currencies with no decimal precision', () => {
    const result = formatCurrency(1234567, '¥', true, ',', 0);
    expect(result).toBe('¥1,234,567');
  });
});