import React, { useContext, useReducer, createContext, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type PreferencesState = {
  darkModeEnabled: boolean;
};
type PreferencesAction =
  | {
      type: "toggleDarkMode";
    }
  | {
      type: "enableDarkMode";
    };

function preferencesReducer(
  state: PreferencesState,
  action: PreferencesAction
) {
  switch (action.type) {
    case "toggleDarkMode": {
      return { ...state, darkModeEnabled: !state.darkModeEnabled };
    }
    case "enableDarkMode": {
      return { ...state, darkModeEnabled: true };
    }
  }
}

type PreferencesContextType = {
  state?: PreferencesState;
  dispatch: React.Dispatch<PreferencesAction>;
};
const PreferencesContext = createContext<PreferencesContextType>({
  state: undefined,
  dispatch: () => null,
});

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark");
  const initialState: PreferencesState = {
    darkModeEnabled: prefersDarkMode,
  };
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  useEffect(() => {
    if (prefersDarkMode) dispatch({ type: "enableDarkMode" });
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
