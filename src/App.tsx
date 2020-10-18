import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import TextEncodingForm from "./TextEncodingForm";
import AppFooter from "./AppFooter";

function App() {
  return (
    <Box padding={3} display="flex" flexDirection="column" minHeight="100vh">
      <CssBaseline />
      <TextEncodingForm />
      <AppFooter
        display="flex"
        justifyContent="space-between"
        marginTop="auto"
      />
    </Box>
  );
}

export default App;
