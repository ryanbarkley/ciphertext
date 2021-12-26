import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the app without errors", () => {
  const { getByText } = render(<App />);
  const appTitle = getByText(/CipherText/i);
  expect(appTitle).toBeInTheDocument();
});
