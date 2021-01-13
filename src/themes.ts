import { ThemeOptions } from "@material-ui/core/styles";
import type {} from "@material-ui/lab/themeAugmentation";
import { purple, pink, blueGrey } from "@material-ui/core/colors";

export const lightTheme: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: purple[800],
    },
    secondary: {
      main: pink[500],
    },
    background: {
      default: blueGrey[50],
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: "rgba(0, 0, 0, 0.75)",
      },
    },
    MuiToggleButton: {
      root: {
        "&$selected": {
          color: "rgba(0, 0, 0, 0.75)",
        },
      },
      label: {
        color: "rgba(0, 0, 0, 0.65)",
      },
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: purple[200],
    },
    secondary: {
      main: pink[100],
    },
  },
  overrides: {
    MuiToggleButton: {
      root: {
        "&$selected": {
          color: "rgba(255, 255, 255, 0.75)",
        },
      },
      label: {
        color: "rgba(255, 255, 255, 0.65)",
      },
    },
  },
};
