import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppFooter from "./AppFooter";
import { usePreferences, PreferencesProvider } from "./PreferencesContext";

const Wrapper: React.ComponentType = ({ children }) => {
  return <PreferencesProvider>{children}</PreferencesProvider>;
};

test("renders a Twitter profile link", () => {
  const { getByText } = render(<AppFooter />, { wrapper: Wrapper });
  const linkElement = getByText(/@ryanbarkley/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders a GitHub project link", () => {
  const { getByLabelText } = render(<AppFooter />, { wrapper: Wrapper });
  const linkElement = getByLabelText(/GitHub repo/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders a theme style toggle button", async () => {
  const { result } = renderHook(usePreferences, { wrapper: Wrapper });
  const initialThemeStyle = result.current.state.themeStyle;
  const { getByTitle } = render(<AppFooter />, { wrapper: Wrapper });
  const buttonElement = getByTitle(/toggle theme style/i);

  expect(buttonElement).toBeInTheDocument();
  userEvent.click(buttonElement);
  waitFor(() =>
    expect(result.current.state.themeStyle).not.toBe(initialThemeStyle)
  );

  userEvent.click(buttonElement);
  waitFor(() =>
    expect(result.current.state.themeStyle).toBe(initialThemeStyle)
  );
});
