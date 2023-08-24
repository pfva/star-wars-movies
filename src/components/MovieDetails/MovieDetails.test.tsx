import { render, screen } from '@testing-library/react';
import { Movie } from '../../types';
import MovieDetails from './MovieDetails';
import useGetRatings from '../../hooks/useGetRatings';

jest.mock('../../hooks/useGetRatings', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const selectedMovie: Movie = {
  title: 'A New Hope',
  episodeId: 4,
  episodeName: 'EPISODE IV',
  description: 'It is a period of civil war. Rebel spaceships, striking from a hidden base',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  releaseDate: '1977-05-25',
};

describe('MovieDetails', () => {
  beforeEach(() => {
    (useGetRatings as jest.Mock).mockReturnValue({
      data: [
        {
          source: 'Internet Movie Database',
          value: '8.6/10',
        },
      ],
    });
  });

  it('should render the correct movie details when a movie is selected', () => {
    render(<MovieDetails selectedMovie={selectedMovie} />);

    const message = screen.getByText(/It is a period of civil war/i);

    expect(message).toBeInTheDocument();
  });

  it('should render a message when no movie is selected', () => {
    render(<MovieDetails selectedMovie={undefined} />);

    const message = screen.getByText(/Select a movie to view details/i);

    expect(message).toBeInTheDocument();
  });
});
