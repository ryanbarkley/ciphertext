import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./themes";
import { usePreferences } from "./PreferencesContext";

export default function PreferredThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state: preferences } = usePreferences();
  const themeOptions = preferences.darkModeEnabled ? darkTheme : lightTheme;
  const theme = createMuiTheme(themeOptions);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
