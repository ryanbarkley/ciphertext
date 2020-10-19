import Algorithms from "./Algorithms";

type EncodingType = "ascii" | "base64" | "hex";
type AlgorithmType = Exclude<EncodingType, "ascii">;

const testString: Record<EncodingType, string> = {
  ascii: "Test source string.",
  base64: "VGVzdCBzb3VyY2Ugc3RyaW5nLg==",
  hex: "5465737420736f7572636520737472696e672e",
};

test.each(["base64", "hex"])("%s", (algorithmName) => {
  const algorithm = Algorithms[algorithmName as AlgorithmType];
  const encodedString = testString[algorithmName as AlgorithmType];
  expect(algorithm.encode(testString.ascii)).toBe(encodedString);
  expect(algorithm.decode(encodedString)).toBe(testString.ascii);
});
