import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import type {} from "@material-ui/lab/themeAugmentation";
import { purple, pink, blueGrey } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import TextEncodingForm from "./TextEncodingForm";
import AppMeta from "./AppMeta";
import AppFooter from "./AppFooter";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: pink[500],
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: "rgba(0, 0, 0, 0.75)",
      },
    },
    MuiToggleButton: {
      root: {
        "&$selected": {
          color: "rgba(0, 0, 0, 0.75)",
        },
      },
      label: {
        color: "rgba(0, 0, 0, 0.65)",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        padding={3}
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bgcolor={blueGrey[50]}
      >
        <CssBaseline />
        <AppMeta
          component="header"
          display="flex"
          flexDirection="column"
          marginBottom={3}
        />
        <TextEncodingForm component="main" />
        <AppFooter
          component="footer"
          display="flex"
          justifyContent="space-between"
          marginTop="auto"
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
