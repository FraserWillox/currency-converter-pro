import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // light blue
    },
    secondary: {
      main: '#dc004e', // red + pink
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
};

const theme = createTheme(themeOptions);

export default theme;
