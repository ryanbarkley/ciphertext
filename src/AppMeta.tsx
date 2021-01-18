import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

function AppMeta(props: BoxProps) {
  return (
    <Box {...props}>
      <Typography variant="h3" component="h1">
        <Link component={RouterLink} to={"/"}>
          Cryptogram
        </Link>
      </Typography>
      <Typography>
        Encode and decode text using common algorithms and substitution ciphers.
      </Typography>
    </Box>
  );
}

export default AppMeta;
