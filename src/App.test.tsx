import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFetch } from 'usehooks-ts';
import App from './App';
import useGetMovieMetadata from './hooks/useGetMovieMetadata';

jest.mock('usehooks-ts');
jest.mock('./hooks/useGetMovieMetadata', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('./assets/darth-vader.svg', () => 'mockedImage');

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
    (useGetMovieMetadata as jest.Mock).mockReturnValue({
      data: [
        {
          source: 'Internet Movie Database',
          value: '8.6/10',
        },
      ],
    });
  });

  it('should render a list of movies', () => {
    render(<App />);

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('movie-episode-name')).toHaveLength(2);
  });

  it('should render movie details when a movie is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    const movies = screen.getAllByTestId('movie-episode-name');
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

    const movies = screen.getAllByTestId('movie-release-date');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/1977-05-25/i);
    expect(lastMovie).toHaveTextContent(/1980-05-17/i);
  });

  it('should sort movies based on year (descending)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sortButton = screen.getByText(/Sort by/i);
    await user.click(sortButton);
    const sortOption = screen.getByText(/Sort by year \(descending\)/i);
    await user.click(sortOption);

    const movies = screen.getAllByTestId('movie-release-date');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/1980-05-17/i);
    expect(lastMovie).toHaveTextContent(/1977-05-25/i);
  });

  it('should sort movies based on episode (ascending)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sortButton = screen.getByText(/Sort by/i);
    await user.click(sortButton);
    const sortOption = screen.getByText(/Sort by episode \(ascending\)/i);
    await user.click(sortOption);

    const movies = screen.getAllByTestId('movie-episode-name');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/EPISODE IV/i);
    expect(lastMovie).toHaveTextContent(/EPISODE V/i);
  });

  it('should sort movies based on episode (descending)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sortButton = screen.getByText(/Sort by/i);
    await user.click(sortButton);
    const sortOption = screen.getByText(/Sort by episode \(descending\)/i);
    await user.click(sortOption);

    const movies = screen.getAllByTestId('movie-episode-name');
    const firstMovie = movies[0];
    const lastMovie = movies.at(-1);

    expect(firstMovie).toHaveTextContent(/EPISODE V/i);
    expect(lastMovie).toHaveTextContent(/EPISODE IV/i);
  });

  it('should filter movies based on text field input', () => {
    const user = userEvent.setup();
    render(<App />);

    const searchField = screen.getByTestId('search-field');
    user.type(searchField, 'Empire');

    const movies = screen.getAllByTestId('movie-title');
    const firstMovie = movies[0];

    waitFor(() => expect(movies).toHaveLength(1));
    waitFor(() => expect(firstMovie).toHaveTextContent(/The Empire Strikes Back/i));
  });

  it('should render a loading page when no data has yet been returned', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
    });
    render(<App />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
