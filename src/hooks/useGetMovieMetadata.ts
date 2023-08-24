import { useFetch } from 'usehooks-ts';
import { Movie, RatingResult } from '../types';
import { useMemo } from 'react';

const URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&`;

const transformRatingsData = (data: RatingResult | undefined) => {
  return data?.Ratings?.map(rating => {
    const { Source, Value } = rating;

    return {
      source: Source,
      value: Value,
    };
  });
};

const transformPosterData = (data: RatingResult | undefined) => {
  return data?.Poster;
};

const useGetMovieMetadata = (movie: Movie | undefined) => {
  const { title, releaseDate } = movie || {};
  const year = releaseDate?.split('-')[0];
  const endpoint = `${URL}t=${title}&y=${year}`;
  const { data } = useFetch<RatingResult>(endpoint); // The useFetch hook handles caching internally

  return useMemo(() => ({ ratings: transformRatingsData(data), poster: transformPosterData(data) }), [data]);
};

export default useGetMovieMetadata;
