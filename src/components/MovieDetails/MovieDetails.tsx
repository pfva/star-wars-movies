import { Box, Chip } from '@mui/material';
import useGetMovieMetadata from '../../hooks/useGetMovieMetadata';
import { Movie } from '../../types';
import { calculateAverageRating } from '../../utils';
import RatingStars from '../RatingStars/RatingStars';

interface MovieDetailsProps {
  selectedMovie: Movie | undefined;
}

const MovieDetails = ({ selectedMovie }: MovieDetailsProps) => {
  const { episodeName, title, description, director, producer } = selectedMovie || {};
  const { ratings, poster } = useGetMovieMetadata(selectedMovie);
  const averageRating = calculateAverageRating(ratings);

  return (
    <>
      <Box display='flex' gap='1rem' alignItems='flex-start'>
        <Box
          component='img'
          src={poster}
          alt='Star Wars movie poster'
          sx={{
            height: 'auto',
            width: 'auto',
            maxWidth: '30%',
            objectFit: 'contain',
            marginTop: '1.5rem',
          }}
        />
        <Box display='flex' flexDirection='column'>
          <h2>{`${episodeName} - ${title}`}</h2>
          <p>{description}</p>
        </Box>
      </Box>
      <p>Directed by: {director}</p>
      <p>Produced by: {producer}</p>
      <RatingStars averageRating={averageRating} />
      <>
        {ratings?.map(rating => {
          const { source, value } = rating;
          return (
            <Chip
              key={source}
              variant='outlined'
              label={`${source}: ${value}`}
              sx={{ color: '#f2e33d', marginRight: '1rem', marginBottom: '2rem' }}
            />
          );
        })}
      </>
    </>
  );
};

export default MovieDetails;
