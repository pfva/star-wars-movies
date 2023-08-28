import { calculateAverageRating, makeRomanNumeral } from './utils';

describe('utils', () => {
  describe('makeRomanNumeral', () => {
    it('should return V when passed 5', () => {
      expect(makeRomanNumeral(5)).toBe('V');
    });
  });

  describe('calculateAverageRating', () => {
    it('should return 0 when passed undefined', () => {
      expect(calculateAverageRating(undefined)).toBe(0);
    });

    it('should return the average when passed multiple values', () => {
      const ratings = [
        { source: 'Rotten Tomatoes', value: '75%' },
        { source: 'Metacritic', value: '25/100' },
      ];
      expect(calculateAverageRating(ratings)).toBe(50);
    });
  });
});
