import { Box } from '@mui/material';
import loadingImage from '../../assets/darth-vader.svg';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100vw' height='80vh'>
      <Box
        component='img'
        src={loadingImage}
        alt='Loading - Darth Vader'
        className='float'
        sx={{
          height: 'auto',
          width: 'auto',
          maxHeight: '50%',
          maxWidth: '50%',
          marginBottom: '2rem',
        }}
      />
      <h2>Loading...</h2>
    </Box>
  );
};

export default LoadingPage;
