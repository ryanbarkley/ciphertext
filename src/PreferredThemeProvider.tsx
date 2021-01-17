import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Themes from "./themes";
import { usePreferences } from "./PreferencesContext";

export default function PreferredThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state: preferences } = usePreferences();
  const theme = createMuiTheme(Themes[preferences.themeStyle]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
