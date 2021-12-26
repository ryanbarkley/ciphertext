import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppMeta from "./AppMeta";

const Wrapper: React.ComponentType = ({ children }) => {
  return <Router>{children}</Router>;
};

test("renders the app title as a link", () => {
  const { getByRole } = render(<AppMeta />, { wrapper: Wrapper });
  const linkElement = getByRole("link", { name: /CipherText/i });
  expect(linkElement).toBeInTheDocument();
});
