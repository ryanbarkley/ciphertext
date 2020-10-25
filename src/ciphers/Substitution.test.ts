import SubstitutionCipher, { getCipherAlphabet } from "./Substitution";

test("get cipher alphabet", () => {
  expect(getCipherAlphabet(0).uppercase.join("")).toBe(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  expect(getCipherAlphabet(13).uppercase.join("")).toBe(
    "NOPQRSTUVWXYZABCDEFGHIJKLM"
  );
  expect(getCipherAlphabet(23).uppercase.join("")).toBe(
    "XYZABCDEFGHIJKLMNOPQRSTUVW"
  );
});

test("encode", () => {
  expect(
    SubstitutionCipher(13).encode(
      "The quick brown fox jumps over the lazy dog."
    )
  ).toBe("Gur dhvpx oebja sbk whzcf bire gur ynml qbt.");
  expect(SubstitutionCipher(23).encode("Et tu, Brute?")).toBe("Bq qr, Yorqb?");
});
test("decode", () => {
  expect(
    SubstitutionCipher(13).decode(
      "Gur dhvpx oebja sbk whzcf bire gur ynml qbt."
    )
  ).toBe("The quick brown fox jumps over the lazy dog.");
  expect(SubstitutionCipher(23).decode("Bq qr, Yorqb?")).toBe("Et tu, Brute?");
});
