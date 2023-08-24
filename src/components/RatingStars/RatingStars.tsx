import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface RatingStarsProps {
  averageRating: number;
}

const RatingStars = ({ averageRating }: RatingStarsProps) => {
  const filledStars = Math.round(averageRating / 10);
  const emptyStars = 10 - filledStars;

  return (
    <Box display='flex' alignItems='center'>
      <p>Average rating: &nbsp;</p>
      {[...Array(filledStars)].map((_, index) => (
        <StarIcon key={index} data-testid='filled-star' sx={{ color: '#f2e33d' }} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorderIcon key={index} data-testid='empty-star' sx={{ color: '#6F7E8C' }} />
      ))}
    </Box>
  );
};

export default RatingStars;
