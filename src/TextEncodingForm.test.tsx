import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/dom";
import TextEncodingForm from "./TextEncodingForm";
import faker from "faker";
import { transformText } from "./Algorithms";

function renderEncodingForm() {
  const form = render(<TextEncodingForm />);
  const inputs = {
    sourceText: form.getByLabelText(/source message/i),
    transformedText: form.getByLabelText(/encoded message/i),
  };
  return { ...form, inputs };
}

test("renders a text encoding form", () => {
  const { getByLabelText, getByRole } = renderEncodingForm();

  expect(getByLabelText(/algorithm/i)).toBeInTheDocument();
  expect(getByRole("group", { name: "Algorithim Mode" })).toBeInTheDocument();
  expect(getByLabelText(/source message/i)).toBeInTheDocument();
  expect(getByLabelText(/encoded message/i)).toBeInTheDocument();
});

test("automatically transforms the source message when entered", () => {
  const { inputs } = renderEncodingForm();
  const rawText = faker.lorem.sentence().trim();
  const encodedText = transformText(rawText, "base64", "encode");

  userEvent.type(inputs.sourceText, rawText);
  expect(inputs.transformedText).toHaveTextContent(encodedText);
});

test("allows the algorithm to be changed", () => {
  const { getByLabelText, getByText, inputs } = renderEncodingForm();
  const algorithmSelection = getByLabelText(/algorithm/i);
  const hexadecimalOption = () => getByText(/hexadecimal/i);
  const rawText = faker.lorem.sentence().trim();
  const encodedText = transformText(rawText, "hex", "encode");

  expect(algorithmSelection).not.toHaveTextContent(/hexadecimal/i);
  userEvent.click(algorithmSelection);
  userEvent.click(hexadecimalOption());
  expect(algorithmSelection).toHaveTextContent(/hexadecimal/i);
  userEvent.type(inputs.sourceText, rawText);
  expect(inputs.transformedText).toHaveTextContent(encodedText);
});
test("allows the algorithm mode to be changed", () => {
  const { getByRole, inputs } = renderEncodingForm();
  const modeSelection = getByRole("group", { name: "Algorithim Mode" });
  const selectedMode = () =>
    within(modeSelection).getByRole("button", {
      pressed: true,
    });
  const decodeOption = within(modeSelection).getByLabelText(/decode/i);
  const rawText = faker.lorem.sentence().trim();
  const encodedText = transformText(rawText, "base64", "encode");

  expect(selectedMode()).toHaveTextContent(/encode/i);
  userEvent.click(decodeOption);
  expect(selectedMode()).toHaveTextContent(/decode/i);
  userEvent.type(inputs.sourceText, encodedText);
  expect(inputs.transformedText).toHaveTextContent(rawText);
});
