import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { usePreferences, PreferencesProvider } from "./PreferencesContext";
import { render } from "@testing-library/react";

const Wrapper: React.ComponentType = ({ children }) => {
  return <PreferencesProvider>{children}</PreferencesProvider>;
};

test("throws an error when called outside a PreferencesProvider", async () => {
  const mockedConsoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  let result;
  function TestComponent() {
    result = usePreferences();
    return null;
  }

  expect(() => render(<TestComponent />)).toThrowErrorMatchingInlineSnapshot(
    `"usePreferences must be used within a PreferencesProvider."`
  );

  mockedConsoleError.mockRestore();
});

test("allows dark mode to be toggled", () => {
  const { result } = renderHook(usePreferences, { wrapper: Wrapper });

  expect(result.current.state.darkModeEnabled).toBe(false);
  act(() =>
    result.current.dispatch({
      type: "toggleDarkMode",
    })
  );
  expect(result.current.state.darkModeEnabled).toBe(true);
  act(() =>
    result.current.dispatch({
      type: "toggleDarkMode",
    })
  );
  expect(result.current.state.darkModeEnabled).toBe(false);
});

test("allows dark mode to be enabled", () => {
  const { result } = renderHook(usePreferences, { wrapper: Wrapper });

  expect(result.current.state.darkModeEnabled).toBe(false);
  act(() =>
    result.current.dispatch({
      type: "enableDarkMode",
    })
  );
  expect(result.current.state.darkModeEnabled).toBe(true);
});
