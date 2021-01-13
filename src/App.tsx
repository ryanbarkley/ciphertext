import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import TextEncodingForm from "./TextEncodingForm";
import AppMeta from "./AppMeta";
import AppFooter from "./AppFooter";
import { PreferencesProvider } from "./PreferencesContext";
import PreferredThemeProvider from "./PreferredThemeProvider";

function App() {
  return (
    <PreferencesProvider>
      <PreferredThemeProvider>
        <Box
          padding={3}
          display="flex"
          flexDirection="column"
          minHeight="100vh"
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
      </PreferredThemeProvider>
    </PreferencesProvider>
  );
}

export default App;
