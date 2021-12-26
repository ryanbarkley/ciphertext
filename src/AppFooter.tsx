import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { usePreferences } from "./PreferencesContext";

function AppFooter(props: BoxProps) {
  const { state: preferences, dispatch } = usePreferences();
  const toggleThemeStyle = () =>
    dispatch({
      type: "toggleThemeStyle",
    });

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
      <Box display="flex">
        <Link
          href="https://github.com/ryanbarkley/ciphertext"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub repo"
        >
          <GitHubIcon aria-label="GitHub repo" />
        </Link>
        <Link
          component="button"
          title="Toggle theme style"
          onClick={toggleThemeStyle}
          style={{
            marginLeft: ".75em",
          }}
        >
          {preferences.themeStyle === "light" ? (
            <BrightnessHighIcon aria-label="light mode" />
          ) : (
            <Brightness4Icon aria-label="dark mode" />
          )}
        </Link>
      </Box>
    </Box>
  );
}

export default AppFooter;
