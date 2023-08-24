import { Box, Chip } from '@mui/material';
import useGetRatings from '../../hooks/useGetRatings';
import { Movie } from '../../types';
import { calculateAverageRating } from '../../utils';

interface MovieDetailsProps {
  selectedMovie: Movie | undefined;
}

const MovieDetails = ({ selectedMovie }: MovieDetailsProps) => {
  const { episodeName, title, description } = selectedMovie || {};
  const { data: ratings } = useGetRatings(selectedMovie);
  const averageRating = calculateAverageRating(ratings);
  console.log({ averageRating });

  return (
    <Box padding='0 2rem'>
      {!selectedMovie ? (
        <h2>Select a movie to view details</h2>
      ) : (
        <>
          <h2>{`${episodeName} -  ${title}`}</h2>
          <p>{description}</p>
          <Box>
            {ratings?.map(rating => {
              const { source, value } = rating;
              return <Chip key={source} label={`${source}: ${value}`} sx={{ color: '#f2e33d' }} />;
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MovieDetails;
