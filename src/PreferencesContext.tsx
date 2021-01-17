import React, { useContext, useReducer, createContext, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type ThemeStyle = "light" | "dark";
type PreferencesState = {
  themeStyle: ThemeStyle;
};
type PreferencesAction =
  | {
      type: "toggleThemeStyle";
    }
  | {
      type: "setThemeStyle";
      data: {
        themeStyle: ThemeStyle;
      };
    };

function preferencesReducer(
  state: PreferencesState,
  action: PreferencesAction
): PreferencesState {
  switch (action.type) {
    case "toggleThemeStyle": {
      return {
        ...state,
        themeStyle: state.themeStyle === "light" ? "dark" : "light",
      };
    }
    case "setThemeStyle": {
      return { ...state, themeStyle: action.data.themeStyle };
    }
  }
}

type PreferencesContextType = {
  state?: PreferencesState;
  dispatch?: React.Dispatch<PreferencesAction>;
};
const PreferencesContext = createContext<PreferencesContextType>({
  state: undefined,
  dispatch: undefined,
});

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const initialState: PreferencesState = {
    themeStyle: "light",
  };
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  useEffect(() => {
    if (prefersDarkMode)
      dispatch({ type: "setThemeStyle", data: { themeStyle: "dark" } });
  }, [prefersDarkMode]);

  return (
    <PreferencesContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context.state === undefined) {
    throw new Error(
      "usePreferences must be used within a PreferencesProvider."
    );
  }
  return context as Required<PreferencesContextType>;
}
