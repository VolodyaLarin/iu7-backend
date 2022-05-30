const letters = {
  Ё: "YO",
  Й: "I",
  Ц: "TS",
  У: "U",
  К: "K",
  Е: "E",
  Н: "N",
  Г: "G",
  Ш: "SH",
  Щ: "SCH",
  З: "Z",
  Х: "H",
  Ъ: "",
  ё: "yo",
  й: "i",
  ц: "ts",
  у: "u",
  к: "k",
  е: "e",
  н: "n",
  г: "g",
  ш: "sh",
  щ: "sch",
  з: "z",
  х: "h",
  ъ: "",
  Ф: "F",
  Ы: "I",
  В: "V",
  А: "a",
  П: "P",
  Р: "R",
  О: "O",
  Л: "L",
  Д: "D",
  Ж: "ZH",
  Э: "E",
  ф: "f",
  ы: "i",
  в: "v",
  а: "a",
  п: "p",
  р: "r",
  о: "o",
  л: "l",
  д: "d",
  ж: "zh",
  э: "e",
  Я: "Ya",
  Ч: "CH",
  С: "S",
  М: "M",
  И: "I",
  Т: "T",
  Ь: "",
  Б: "B",
  Ю: "YU",
  я: "ya",
  ч: "ch",
  с: "s",
  м: "m",
  и: "i",
  т: "t",
  ь: "",
  б: "b",
  ю: "yu",
};

const lettersFrom = {
  YO: "Ё",
  TS: "Ц",
  U: "У",
  K: "К",
  E: "Е",
  N: "Н",
  G: "Г",
  SH: "Ш",
  SCH: "Щ",
  Z: "З",
  H: "Х",
  yo: "ё",
  ts: "ц",
  u: "у",
  k: "к",
  e: "е",
  n: "н",
  g: "г",
  sh: "ш",
  sch: "щ",
  z: "з",
  h: "х",
  F: "Ф",
  V: "В",
  A: "А",
  P: "П",
  R: "Р",
  O: "О",
  L: "Л",
  D: "Д",
  ZH: "Ж",
  f: "ф",
  v: "в",
  a: "а",
  p: "п",
  r: "р",
  o: "о",
  l: "л",
  d: "д",
  zh: "ж",
  Ya: "Я",
  CH: "Ч",
  S: "С",
  M: "М",
  I: "И",
  T: "Т",
  B: "Б",
  YU: "Ю",
  ya: "я",
  ch: "ч",
  s: "с",
  m: "м",
  i: "и",
  t: "т",
  b: "б",
  yu: "ю",
};

function transliterate(word, l) {
  return word
    .split("")
    .map(function (char) {
      // eslint-disable-next-line no-prototype-builtins
      return l.hasOwnProperty(char) ? l[char] : char;
    })
    .join("");
}

export default (word) => transliterate(word, letters);

export const reverseTransliterate = (word) => transliterate(word, lettersFrom);
