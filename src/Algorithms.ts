import SubstitutionCipher from "./ciphers/Substitution";

export const AlgorithmModes = ["encode", "decode"];
export type AlgorithmMode = "encode" | "decode";
export const isSupportedAlgorithmMode = (name: string) =>
  AlgorithmModes.includes(name);

export type Algorithm = {
  title: string;
  type: "basic-encoding" | "substitution-cipher";
  description: string;
  url: string;
  encode: (text: string) => string;
  decode: (text: string) => string;
};
export type AlgorithmMap = {
  [key in AlgorithmName]: Algorithm;
};
export type AlgorithmDictionary = {
  base64: Algorithm;
  hex: Algorithm;
  octal: Algorithm;
  caesar: Algorithm;
  rot13: Algorithm;
};

const Algorithms: AlgorithmDictionary = {
  base64: {
    title: "Base 64",
    type: "basic-encoding",
    description:
      "Base 64 is commonly used to encode plain text data before transmitting over HTTP and uses the base-64 numbering system.",
    url: "https://en.wikipedia.org/wiki/Base64",
    encode: (text: string) => Buffer.from(text, "ascii").toString("base64"),
    decode: (text: string) => Buffer.from(text, "base64").toString("ascii"),
  },
  hex: {
    title: "Hexadecimal",
    type: "basic-encoding",
    description:
      "Hexadecimal notation is commonly used for color codes and uses the base-16 numbering system.",
    url: "https://en.wikipedia.org/wiki/Hexadecimal",
    encode: (text: string) => Buffer.from(text, "ascii").toString("hex"),
    decode: (text: string) => Buffer.from(text, "hex").toString("ascii"),
  },
  octal: {
    title: "Octal",
    type: "basic-encoding",
    description:
      "Octal encoding is another common representation of numeric values and uses the base-8 numbering system",
    url: "https://en.wikipedia.org/wiki/Octal",
    encode: (text: string) =>
      Array.from(Buffer.from(text, "ascii"))
        .map((b) => b.toString(8).padStart(3, "0"))
        .join(" "),
    decode: (text: string) =>
      Buffer.from(text.split(" ").map((b) => Number.parseInt(b, 8))).toString(
        "ascii"
      ),
  },
  caesar: {
    title: "Caesar",
    type: "substitution-cipher",
    description:
      "The Caesar Cipher rotates the basic Latin alphabet to the left by 3 characters. It is one of the most famous classical substitution ciphers.",
    url: "https://en.wikipedia.org/wiki/Caesar_cipher",
    encode: (text: string) => SubstitutionCipher(23).encode(text),
    decode: (text: string) => SubstitutionCipher(23).decode(text),
  },
  rot13: {
    title: "ROT13",
    type: "substitution-cipher",
    description:
      "The ROR13 cipher rotates the basic Latin alphabet by 13 characters, making it unique in that the same process is used to both decode and encode messages. It has commonly been used for encoding messages in comic books and other similar media.",
    url: "https://en.wikipedia.org/wiki/ROT13",
    encode: (text: string) => SubstitutionCipher(13).encode(text),
    decode: (text: string) => SubstitutionCipher(13).decode(text),
  },
};

export const AlgorithmNames = Object.keys(Algorithms);
export type AlgorithmName = keyof typeof Algorithms;
export const isSupportedAlgorithm = (name: string) =>
  AlgorithmNames.includes(name);

export const transformText = (
  text: string,
  algorithm: AlgorithmName,
  mode: AlgorithmMode
) => Algorithms[algorithm][mode](text);

export default Algorithms;
