import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppMeta from "./AppMeta";
import AppFooter from "./AppFooter";
import TextEncodingForm from "./TextEncodingForm";
import SupportedAlgorithms from "./SupportedAlgorithms";
import { PreferencesProvider } from "./PreferencesContext";
import PreferredThemeProvider from "./PreferredThemeProvider";

function App() {
  return (
    <PreferencesProvider>
      <PreferredThemeProvider>
        <Router>
          <CssBaseline />
          <Box
            padding={3}
            display="flex"
            flexDirection="column"
            minHeight="100vh"
          >
            <AppMeta
              component="header"
              display="flex"
              flexDirection="column"
              marginBottom={3}
            />
            <Box component="main">
              <Switch>
                <Route path="/supported-algorithms">
                  <SupportedAlgorithms />
                </Route>
                <Route path="/">
                  <TextEncodingForm />
                </Route>
              </Switch>
            </Box>
            <AppFooter
              component="footer"
              display="flex"
              justifyContent="space-between"
              marginTop="auto"
            />
          </Box>
        </Router>
      </PreferredThemeProvider>
    </PreferencesProvider>
  );
}

export default App;
