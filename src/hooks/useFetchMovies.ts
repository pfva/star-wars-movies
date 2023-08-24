import { useFetch } from 'usehooks-ts';
import { APIResult } from '../types';
import { useMemo } from 'react';
import { makeRomanNumeral } from '../utils';

const ENDPOINT = 'https://swapi.dev/api/films/?format=json';

const transformData = (data: APIResult | undefined) => {
  return data?.results?.map(movie => {
    const { title, episode_id, opening_crawl, director, producer, release_date } = movie;
    const episodeName = `EPISODE ${makeRomanNumeral(episode_id)}`;

    return {
      title,
      director,
      producer,
      episodeName,
      episodeId: episode_id,
      description: opening_crawl,
      releaseDate: release_date,
    };
  });
};

const useFetchMovies = () => {
  const { data } = useFetch<APIResult>(ENDPOINT); // The useFetch hook handles caching internally

  return useMemo(() => ({ data: transformData(data) }), [data]);
};

export default useFetchMovies;
