import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./components/Dashboard";
import { CssBaseline } from "@mui/material";
import "./App.css";

const commonStyles = {
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: "2.2rem",
      lineHeight: 1.5,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.5,
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 700,
      fontSize: "0.625rem",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "0.92rem",
      lineHeight: 1.54,
    },
  },
  fontFamily: ["Open Sans", "sans-serif"],
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fea013",
    },
    secondary: {
      main: "#BA4A0C",
    },
    text: {
      primary: "#f8f8f8",
      secondary: "#CBCBCB",
      disabled: "#999999",
    },
    background: {
      default: "#222222",
      paper: "#2d2d2d",
    },
    error: {
      main: "#D23131",
    },
  },
  ...commonStyles,
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </>
  );
}
