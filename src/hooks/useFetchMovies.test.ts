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
    });
  });

  it('should transform and return data', () => {
    const { result } = renderHook(() => useFetchMovies());
    const { data } = result.current;
    const firstMovie = data?.[0];

    expect(firstMovie).toEqual({
      description: 'It is a period of civil war. Rebel spaceships, striking from a hidden base',
      director: 'George Lucas',
      episodeId: 4,
      episodeName: 'EPISODE IV',
      producer: 'Gary Kurtz, Rick McCallum',
      releaseDate: '1977-05-25',
      title: 'A New Hope',
    });
  });
});
