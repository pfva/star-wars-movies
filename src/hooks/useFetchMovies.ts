import { useFetch } from 'usehooks-ts';

const ENDPOINT = 'https://swapi.dev/api/films/?format=json';

interface MovieResult {
  count: number;
  results: Movie[];
}

interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: number;
  director: string;
  producer: string;
  release_date: string;
}

const useFetchMovies = () => {
  const { data, error } = useFetch<MovieResult>(ENDPOINT); // The useFetch hook handles caching internally

  // TODO: Add data transformer?
  return { data, error };
};

export default useFetchMovies;
