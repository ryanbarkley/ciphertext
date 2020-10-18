import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";

function AppFooter(props: BoxProps) {
  return (
    <Box {...props}>
      <Typography>
        a project by{" "}
        <Link
          href="https://twitter.com/ryanbarkley"
          target="_blank"
          rel="noopener noreferrer"
          title="Find @ryanbarkley on Twitter"
        >
          @ryanbarkley
        </Link>
      </Typography>
      <Box>
        <Link
          href="https://github.com/ryanbarkley/cryptogram"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub repo"
        >
          <GitHubIcon aria-label="GitHub repo" />
        </Link>
      </Box>
    </Box>
  );
}

export default AppFooter;
