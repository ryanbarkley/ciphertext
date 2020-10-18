import React from "react";
import { render } from "@testing-library/react";
import AppMeta from "./AppMeta";

test("renders the app title", () => {
  const { getByText } = render(<AppMeta />);
  const appTitle = getByText(/Cryptogram/i);
  expect(appTitle).toBeInTheDocument();
});
