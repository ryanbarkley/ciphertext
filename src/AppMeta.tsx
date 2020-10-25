import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function AppMeta(props: BoxProps) {
  return (
    <Box {...props}>
      <Typography style={{ fontSize: 32 }}>Cryptogram</Typography>
      <Typography>
        Encode and decode text using common algorithms and substitution ciphers.
      </Typography>
      <Typography>
        Select an algorithm below to encode or decode source text.
      </Typography>
    </Box>
  );
}

export default AppMeta;
