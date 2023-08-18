import { renderHook } from '@testing-library/react';
import { useFetch } from 'usehooks-ts';
import useFetchMovies from './useFetchMovies';

jest.mock('usehooks-ts');

describe('useFetchMovies', () => {
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
        ],
      },
      error: undefined,
    });
  });

  it('should return data', () => {
    const { result } = renderHook(() => useFetchMovies());
    const { data } = result.current;
    const { count, results } = data || {};

    expect(count).toBe(1);
    expect(results?.[0]?.title).toBe('A New Hope');
  });

  it('should return error', () => {
    const { result } = renderHook(() => useFetchMovies());
    const { error } = result.current;

    expect(error).toBe(undefined);
  });
});
