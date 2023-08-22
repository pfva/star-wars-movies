import { Box } from '@mui/material';
import { Movie } from '../../types';

interface MovieDetailsProps {
  selectedIndex: number | undefined;
  movies: Movie[];
}

const MovieDetails = ({ selectedIndex, movies }: MovieDetailsProps) => {
  const selectedMovie = movies?.find((movie: Movie) => movie.episodeId === selectedIndex);
  const { episodeName, title, description } = selectedMovie || {};

  return (
    <Box padding='0 2rem'>
      {!selectedIndex ? (
        <h2>Select a movie to view details</h2>
      ) : (
        <>
          <h2>{`${episodeName} -  ${title}`}</h2>
          <p>{description}</p>
        </>
      )}
    </Box>
  );
};
export default MovieDetails;
