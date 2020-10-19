export const AlgorithmModes = ["encode", "decode"];
export type AlgorithmMode = "encode" | "decode";
export const isSupportedAlgorithmMode = (name: string) =>
  AlgorithmModes.includes(name);

export type Algorithm = {
  encode: (text: string) => string;
  decode: (text: string) => string;
};
export type AlgorithmMap = {
  [key in AlgorithmName]: Algorithm;
};

const Algorithms = {
  base64: {
    encode: (text: string) => Buffer.from(text, "ascii").toString("base64"),
    decode: (text: string) => Buffer.from(text, "base64").toString("ascii"),
  } as Algorithm,
  hex: {
    encode: (text: string) => Buffer.from(text, "ascii").toString("hex"),
    decode: (text: string) => Buffer.from(text, "hex").toString("ascii"),
  } as Algorithm,
  octal: {
    encode: (text: string) =>
      Array.from(Buffer.from(text, "ascii"))
        .map((b) => b.toString(8).padStart(3, "0"))
        .join(" "),
    decode: (text: string) =>
      Buffer.from(text.split(" ").map((b) => Number.parseInt(b, 8))).toString(
        "ascii"
      ),
  } as Algorithm,
};

export const AlgorithmNames = Object.keys(Algorithms);
export type AlgorithmName = keyof typeof Algorithms;
export const isSupportedAlgorithm = (name: string) =>
  AlgorithmNames.includes(name);

export const transformText = (
  text: string,
  algorithim: AlgorithmName,
  mode: AlgorithmMode
) => Algorithms[algorithim][mode](text);

export default Algorithms;
