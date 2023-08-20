import { useFetch } from 'usehooks-ts';
import { APIResult } from '../types';
import { useMemo } from 'react';

const ENDPOINT = 'https://swapi.dev/api/films/?format=json';

const dataTransformer = (data: APIResult | undefined) => {
  return data?.results?.map(movie => {
    const { title, episode_id, opening_crawl, director, producer, release_date } = movie;

    return {
      title,
      director,
      producer,
      episode: episode_id,
      description: opening_crawl,
      releaseDate: release_date,
    };
  });
};

const useFetchMovies = () => {
  const { data, error } = useFetch<APIResult>(ENDPOINT); // The useFetch hook handles caching internally

  return useMemo(
    () => ({
      data: dataTransformer(data),
      error,
    }),
    [data, error]
  );
};

export default useFetchMovies;
