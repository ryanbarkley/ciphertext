import Algorithms from "./Algorithms";

type EncodingType = "ascii" | "base64" | "hex" | "octal" | "caesar" | "rot13";
type AlgorithmType = Exclude<EncodingType, "ascii">;

const testString: Record<EncodingType, string> = {
  ascii: "Test source string.",
  base64: "VGVzdCBzb3VyY2Ugc3RyaW5nLg==",
  hex: "5465737420736f7572636520737472696e672e",
  octal:
    "124 145 163 164 040 163 157 165 162 143 145 040 163 164 162 151 156 147 056",
  caesar: "Qbpq plrozb pqofkd.",
  rot13: "Grfg fbhepr fgevat.",
};

test.each(["base64", "hex", "octal", "caesar", "rot13"])(
  "%s",
  (algorithmName) => {
    const algorithm = Algorithms[algorithmName as AlgorithmType];
    const encodedString = testString[algorithmName as AlgorithmType];
    expect(algorithm.encode(testString.ascii)).toBe(encodedString);
    expect(algorithm.decode(encodedString)).toBe(testString.ascii);
  }
);
