import { render, screen } from '@testing-library/react';
import LoadingPage from './LoadingPage';

jest.mock('../../assets/darth-vader.svg', () => 'mockedImage');

describe('LoadingPage', () => {
  it('should render the loading page', () => {
    render(<LoadingPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
