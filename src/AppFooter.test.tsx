import React from "react";
import { render } from "@testing-library/react";
import AppFooter from "./AppFooter";

test("renders a Twitter profile link", () => {
  const { getByText } = render(<AppFooter />);
  const linkElement = getByText(/@ryanbarkley/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders a GitHub project link", () => {
  const { getByLabelText } = render(<AppFooter />);
  const linkElement = getByLabelText(/GitHub repo/i);
  expect(linkElement).toBeInTheDocument();
});
