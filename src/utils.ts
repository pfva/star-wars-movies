export const makeRomanNumeral = (num: number): string => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return romanNumerals[num - 1];
};

export const calculateAverageRating = (ratings: { source: string; value: string }[] | undefined): number => {
  if (!ratings) return 0;
  const total = ratings?.reduce((acc, rating) => {
    const { value } = rating;
    const normalizedValue = value.replace(/[%|\.]/i, '');
    const number = Number(normalizedValue.split('/')[0]);
    return acc + number;
  }, 0);

  return Math.round(total / ratings.length);
};
