import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppFooter from "./AppFooter";
import { PreferencesProvider } from "./PreferencesContext";

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

test("renders a dark mode toggle button", () => {
  const { getByTitle } = render(<AppFooter />, { wrapper: Wrapper });
  const buttonElement = getByTitle(/toggle dark mode/i);
  userEvent.click(buttonElement);
  expect(buttonElement).toBeInTheDocument();
});
