export const makeRomanNumeral = (num: number): string => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return romanNumerals[num - 1];
};
