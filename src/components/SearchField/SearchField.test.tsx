import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Movie } from '../../types';
import SearchField from './SearchField';

const movies: Movie[] = [
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

describe('SearchField', () => {
  let setFilteredMovies: jest.Mock;

  beforeEach(() => {
    setFilteredMovies = jest.fn();
  });

  it('should filter out movie title based on user input', async () => {
    render(<SearchField movies={movies} setFilteredMovies={setFilteredMovies} />);

    const firstMovie = movies[0];
    const searchField = screen.getByTestId('search-field');
    fireEvent.change(searchField, { target: { value: 'Hope' } });

    waitFor(() => expect(setFilteredMovies).toHaveBeenCalledWith([firstMovie]));
  });

  it('should clear the filter when the clear button is clicked', async () => {
    render(<SearchField movies={movies} setFilteredMovies={setFilteredMovies} />);

    const searchField = screen.getByTestId('search-field');
    fireEvent.change(searchField, { target: { value: 'Hope' } });
    const clearButton = screen.getByTestId('clear-filter');
    userEvent.click(clearButton);

    waitFor(() => expect(setFilteredMovies).toHaveBeenCalledWith(movies));
  });
});
