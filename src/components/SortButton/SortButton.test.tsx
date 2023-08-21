import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Movie } from '../../types';
import SortButton from './SortButton';

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

describe('SortButton', () => {
  let setFilteredMovies: jest.Mock;

  beforeEach(() => {
    setFilteredMovies = jest.fn();
  });

  it('should sort movies based on year (ascending)', async () => {
    const user = userEvent.setup();
    render(<SortButton filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />);

    const sortButton = screen.getByText(/Sort by/i);
    await user.click(sortButton);
    const sortOption = screen.getByText(/Sort by year \(ascending\)/i);
    await user.click(sortOption);

    expect(setFilteredMovies).toHaveBeenCalledWith(
      filteredMovies.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
    );
  });

  it('should sort movies based on year (descending)', async () => {
    const user = userEvent.setup();
    render(<SortButton filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />);

    const sortButton = screen.getByText(/Sort by/i);
    await user.click(sortButton);
    const sortOption = screen.getByText(/Sort by year \(descending\)/i);
    await user.click(sortOption);

    expect(setFilteredMovies).toHaveBeenCalledWith(
      filteredMovies.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
    );
  });

  it('should sort movies based on episode (ascending)', async () => {
    const user = userEvent.setup();
    render(<SortButton filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />);

    const sortButton = screen.getByText(/Sort by/i);
    await user.click(sortButton);
    const sortOption = screen.getByText(/Sort by episode \(ascending\)/i);
    await user.click(sortOption);

    expect(setFilteredMovies).toHaveBeenCalledWith(filteredMovies.sort((a, b) => a.episodeId - b.episodeId));
  });

  it('should sort movies based on episode (descending)', async () => {
    const user = userEvent.setup();
    render(<SortButton filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />);

    const sortButton = screen.getByText(/Sort by/i);
    await user.click(sortButton);
    const sortOption = screen.getByText(/Sort by episode \(descending\)/i);
    await user.click(sortOption);

    expect(setFilteredMovies).toHaveBeenCalledWith(filteredMovies.sort((a, b) => b.episodeId - a.episodeId));
  });
});
