import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Movie } from '../../types';
import MovieList from './MovieList';

const filteredMovies: Movie[] = [
  {
    title: 'A New Hope',
    episodeId: 4,
    episodeName: 'EPISODE IV',
    description: 'It is a period of civil war. Rebel spaceships, striking from a hidden base',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    releaseDate: '1977-05-25',
  },
  {
    title: 'The Empire Strikes Back',
    episodeId: 5,
    episodeName: 'EPISODE V',
    description: 'It is a dark time for the Rebellion. Although the Death Star has been destroyed',
    director: 'Irvin Kershner',
    producer: 'Gary Kurtz, Rick McCallum',
    releaseDate: '1980-05-17',
  },
];

describe('MovieList', () => {
  let setSelectedIndex: jest.Mock;

  beforeEach(() => {
    setSelectedIndex = jest.fn();
  });

  it('should render a list of movies', () => {
    render(<MovieList selectedIndex={4} filteredMovies={filteredMovies} setSelectedIndex={setSelectedIndex} />);

    const firstMovieTitle = screen.getByText(/A New Hope/i);
    const secondMovieTitle = screen.getByText(/The Empire Strikes Back/i);

    expect(firstMovieTitle).toBeInTheDocument();
    expect(secondMovieTitle).toBeInTheDocument();
  });

  it('should call setSelectedIndex when a movie is clicked', async () => {
    const user = userEvent.setup();
    render(<MovieList selectedIndex={4} filteredMovies={filteredMovies} setSelectedIndex={setSelectedIndex} />);

    const firstMovieTitle = screen.getByText(/A New Hope/i);
    await user.click(firstMovieTitle);

    expect(setSelectedIndex).toHaveBeenCalledWith(4);
  });
});
