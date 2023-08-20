import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFetch } from 'usehooks-ts';
import App from './App';

jest.mock('usehooks-ts');

describe('App', () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        count: 1,
        results: [
          {
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl: 'It is a period of civil war. Rebel spaceships, striking from a hidden base',
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1977-05-25',
          },
          {
            title: 'The Empire Strikes Back',
            episode_id: 5,
            opening_crawl: 'It is a dark time for the Rebellion. Although the Death Star has been destroyed',
            director: 'Irvin Kershner',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1980-05-17',
          },
        ],
      },
      error: undefined,
    });
  });

  it('should render a list of movies', () => {
    render(<App />);

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('list-item-movie')).toHaveLength(2);
  });

  it('should render movie details when a movie is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    const movies = screen.getAllByTestId('list-item-movie');
    const firstMovie = movies[0];

    await user.click(firstMovie);

    expect(screen.getByText(/It is a period of civil war/i)).toBeInTheDocument();
  });

  it('should render default text if no movie is selected', () => {
    render(<App />);

    expect(screen.getByText(/Select a movie to view details/i)).toBeInTheDocument();
  });

  it('should sort movies based on year (ascending) by default', () => {
    render(<App />);

    const movies = screen.getAllByTestId('list-item-movie');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/1977-05-25/i);
    expect(lastMovie).toHaveTextContent(/1980-05-17/i);
  });

  it('should sort movies based on year (descending)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sortButton = screen.getByText(/Sort by year \(descending\)/i);
    await user.click(sortButton);

    const movies = screen.getAllByTestId('list-item-movie');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/1980-05-17/i);
    expect(lastMovie).toHaveTextContent(/1977-05-25/i);
  });

  it('should sort movies based on episode (ascending)', () => {
    render(<App />);

    const sortButton = screen.getByText(/Sort by episode \(ascending\)/i);
    sortButton.click();

    const movies = screen.getAllByTestId('list-item-movie');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/Episode 4/i);
    expect(lastMovie).toHaveTextContent(/Episode 5/i);
  });

  it('should sort movies based on episode (descending)', () => {
    render(<App />);

    const sortButton = screen.getByText(/Sort by episode \(descending\)/i);
    sortButton.click();

    const movies = screen.getAllByTestId('list-item-movie');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/Episode 5/i);
    expect(lastMovie).toHaveTextContent(/Episode 4/i);
  });

  it('should filter movies based on text field input', () => {
    const user = userEvent.setup();
    render(<App />);

    const searchField = screen.getByPlaceholderText(/Type to search/i);
    user.type(searchField, 'Empire');

    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getAllByRole('button')[0]).toHaveTextContent(/The Empire Strikes Back/i);
  });
});
