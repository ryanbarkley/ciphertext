import faker from "faker";

import { transformText } from "../../src/Algorithms";

describe("text encoding", () => {
  it("can encode text", () => {
    const rawText = faker.lorem.sentence().trim();
    const encodedText = transformText(rawText, "base64", "encode");

    cy.visit("/");
    cy.findByLabelText(/source message/i).type(rawText);
    cy.findByLabelText(/encoded message/i).should("have.text", encodedText);
  });
});
