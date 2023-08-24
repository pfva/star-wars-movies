import { render, screen } from '@testing-library/react';
import RatingStars from './RatingStars';

describe('RatingStars', () => {
  it('should render the correct amount of filled and empty stars', () => {
    render(<RatingStars averageRating={78} />);

    const filledStars = screen.getAllByTestId('filled-star');
    const emptyStars = screen.getAllByTestId('empty-star');

    expect(filledStars).toHaveLength(8);
    expect(emptyStars).toHaveLength(2);
  });
});
