import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: '#0B2569', // customize your primary color
    },
    secondary: {
      main: '#9BF128', // customize your secondary color
    },
    // Add more color overrides as needed
  },
  typography: {
    fontFamily: '"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
  // Add other theme customizations (spacing, breakpoints, components, etc.)
});

export default theme;