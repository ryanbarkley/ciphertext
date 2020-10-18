import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
        <AppMeta display="flex" flexDirection="column" marginBottom={3} />
        <TextEncodingForm />
        <AppFooter
          display="flex"
          justifyContent="space-between"
          marginTop="auto"
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
