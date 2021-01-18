import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SupportedAlgorithms from "./SupportedAlgorithms";

const Wrapper: React.ComponentType = ({ children }) => {
  return <Router>{children}</Router>;
};

test("renders a link to the encoding form", () => {
  const { getByRole } = render(<SupportedAlgorithms />, { wrapper: Wrapper });
  const linkElement = getByRole("link", { name: /encode or decode/i });
  expect(linkElement).toBeInTheDocument();
});
