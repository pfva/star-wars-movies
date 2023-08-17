import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should render a list of movies', () => {
    render(<App />);

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('should render movie details when a movie is selected', () => {
    render(<App />);

    expect(
      screen.getByText(/It is a period of civil war. Rebel spaceships, striking from a hidden base/i)
    ).toBeInTheDocument();
  });

  it('should render default text if no movie is selected', () => {
    render(<App />);

    expect(screen.getByText(/Select a movie to view details/i)).toBeInTheDocument();
  });

  it('should sort movies based on year (ascending) by default', () => {
    render(<App />);

    const listItems = screen.getAllByRole('listitem');
    const firstMovie = listItems[0];
    const lastMovie = listItems.at(-1);

    expect(firstMovie).toHaveTextContent(/A New Hope/i);
    expect(lastMovie).toHaveTextContent(/Revenge of the Sith/i);
  });

  it('should sort movies based on year (descending)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sortButton = screen.getByText(/Sort by year (descending)/i);
    await user.click(sortButton);

    const listItems = screen.getAllByRole('listitem');
    const firstMovie = listItems[0];
    const lastMovie = listItems.at(-1);

    expect(firstMovie).toHaveTextContent(/Revenge of the Sith/i);
    expect(lastMovie).toHaveTextContent(/A New Hope/i);
  });

  it('should sort movies based on episode (ascending)', () => {
    render(<App />);

    const sortButton = screen.getByText(/Sort by episode (ascending)/i);
    sortButton.click();

    const listItems = screen.getAllByRole('listitem');
    const firstMovie = listItems[0];
    const lastMovie = listItems.at(-1);

    expect(firstMovie).toHaveTextContent(/The Phantom Menace/i);
    expect(lastMovie).toHaveTextContent(/Return of the Jedi/i);
  });

  it('should sort movies based on episode (descending)', () => {
    render(<App />);

    const sortButton = screen.getByText(/Sort by episode (descending)/i);
    sortButton.click();

    const listItems = screen.getAllByRole('listitem');
    const firstMovie = listItems[0];
    const lastMovie = listItems.at(-1);

    expect(firstMovie).toHaveTextContent(/The Phantom Menace/i);
    expect(lastMovie).toHaveTextContent(/Return of the Jedi/i);
  });

  it('should filter movies based on text field input', () => {
    const user = userEvent.setup();
    render(<App />);

    const searchField = screen.getByPlaceholderText(/Type to search/i);
    user.type(searchField, 'Empire');

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(/The Empire Strikes Back/i);
  });
});
