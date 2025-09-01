import { createTheme } from "@mui/material/styles";
import { customColors } from "./customColors";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200
    }
  },
  palette: {
    primary: {
      main: customColors.logoBlue
    },
    secondary: {
      main: customColors.logoDarkGreen
    },
    background: {
      black: customColors.black,
      default: "#fff",
      paper: "#fff"
    },
    error: {
      main: customColors.errorRed
    },
    text: {
      primary: customColors.black
    },
    custom: {
      navColor: customColors.blackOpaque,
      navShadow: customColors.navShadow,
      logoLightGreen: customColors.logoLightGreen,
      logoPurple: customColors.logoPurple
    }
  },
  typography: {
    fontFamily:
      '"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500
    }
  }
  // Add other theme customizations (spacing, breakpoints, components, etc.)
});

export default theme;
