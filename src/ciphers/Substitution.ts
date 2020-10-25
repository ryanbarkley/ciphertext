type Alphabet = {
  uppercase: string[];
  lowercase: string[];
};

function getLatinAlphabet(): Alphabet {
  const latinAlphabetUppercase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return {
    uppercase: latinAlphabetUppercase,
    lowercase: latinAlphabetUppercase.map((l) => l.toLocaleLowerCase()),
  };
}

const latinAlphabet = getLatinAlphabet();

export function getCipherAlphabet(shift: number): Alphabet {
  const cipherAlphabetUppercase = latinAlphabet.uppercase
    .slice(shift, latinAlphabet.uppercase.length)
    .concat(latinAlphabet.uppercase.slice(0, shift));
  return {
    uppercase: cipherAlphabetUppercase,
    lowercase: cipherAlphabetUppercase.map((l) => l.toLocaleLowerCase()),
  };
}

function transformText(text: string, source: Alphabet, target: Alphabet) {
  return text
    .split("")
    .map((character) => {
      const uppercaseAlphabetIndex = source.uppercase.indexOf(character);
      const lowercaseAlphabetIndex = source.lowercase.indexOf(character);
      return uppercaseAlphabetIndex >= 0
        ? target.uppercase[uppercaseAlphabetIndex]
        : lowercaseAlphabetIndex >= 0
        ? target.lowercase[lowercaseAlphabetIndex]
        : character;
    })
    .join("");
}

function SubstitutionCipher(shift: number) {
  const cipherAlphabet = getCipherAlphabet(shift);
  return {
    encode: (text: string) => {
      return transformText(text, latinAlphabet, cipherAlphabet);
    },
    decode: (text: string) => {
      return transformText(text, cipherAlphabet, latinAlphabet);
    },
  };
}

export default SubstitutionCipher;
