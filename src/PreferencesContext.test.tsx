import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { render } from "@testing-library/react";
import { usePreferences, PreferencesProvider } from "./PreferencesContext";

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

  expect(result.current.state.themeStyle).toBe("light");
  act(() =>
    result.current.dispatch({
      type: "toggleThemeStyle",
    })
  );
  expect(result.current.state.themeStyle).toBe("dark");
  act(() =>
    result.current.dispatch({
      type: "toggleThemeStyle",
    })
  );
  expect(result.current.state.themeStyle).toBe("light");
});

test("allows theme mode to be set to a specific value", () => {
  const { result } = renderHook(usePreferences, { wrapper: Wrapper });

  expect(result.current.state.themeStyle).toBe("light");
  act(() =>
    result.current.dispatch({
      type: "setThemeStyle",
      data: { themeStyle: "dark" },
    })
  );
  expect(result.current.state.themeStyle).toBe("dark");
});

describe("sets the default theme mode based on system/browser preferences", () => {
  const getMockImplementation =
    (preference: "light" | "dark") =>
    (query: string): MediaQueryList => ({
      matches: query === `(prefers-color-scheme: ${preference})`,
      media: query,
      onchange: null,
      addListener: () => false,
      removeListener: () => false,
      addEventListener: () => false,
      removeEventListener: () => false,
      dispatchEvent: () => false,
    });

  test("light theme preference", () => {
    const mockedMatchMedia = jest
      .fn()
      .mockImplementation(getMockImplementation("light"));
    window.matchMedia = mockedMatchMedia;
    const { result } = renderHook(usePreferences, {
      wrapper: Wrapper,
    });

    expect(result.current.state.themeStyle).toBe("light");

    mockedMatchMedia.mockRestore();
  });

  test("dark theme preference", () => {
    const mockedMatchMedia = jest
      .fn()
      .mockImplementation(getMockImplementation("dark"));
    window.matchMedia = mockedMatchMedia;
    const { result } = renderHook(usePreferences, {
      wrapper: Wrapper,
    });

    expect(result.current.state.themeStyle).toBe("dark");

    mockedMatchMedia.mockRestore();
  });
});
