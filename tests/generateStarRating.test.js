/** @jest-environment jsdom */
const { generateStarRating } = require('../script');

describe('generateStarRating', () => {
  const FULL = '<i class="fa-solid fa-star"></i>';
  const HALF = '<i class="fa-solid fa-star-half-stroke"></i>';
  const EMPTY = '<i class="fa-regular fa-star"></i>';

  test('handles integer ratings', () => {
    const rating = 4;
    const result = generateStarRating(rating);
    expect(result).toBe(FULL.repeat(4) + EMPTY.repeat(1));
  });

  test('handles half-star ratings', () => {
    const rating = 4.5;
    const result = generateStarRating(rating);
    expect(result).toBe(FULL.repeat(4) + HALF + EMPTY.repeat(0));
  });
});
