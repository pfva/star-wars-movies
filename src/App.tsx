import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';
import SearchField from './components/SearchField/SearchField';
import SortButton from './components/SortButton/SortButton';
import useFetchMovies from './hooks/useFetchMovies';
import { Movie } from './types';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const { data } = useFetchMovies();

  useEffect(() => {
    if (data) {
      setMovies(data);
      setFilteredMovies(data);
    }
  }, [data]);

  return (
    <Grid container width='100vw'>
      <Box sx={{ margin: '0 auto' }}>
        <h1>Find your favorite Star Wars movie</h1>
      </Box>
      <Grid item xs={12} display='flex' justifyContent='center'>
        <SearchField movies={movies} setFilteredMovies={setFilteredMovies} />
      </Grid>
      <Grid item xs={12}>
        <SortButton filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />
      </Grid>
      <Grid item xs={6}>
        <MovieList filteredMovies={filteredMovies} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </Grid>
      <Grid item xs={6}>
        <MovieDetails selectedIndex={selectedIndex} movies={movies} />
      </Grid>
    </Grid>
  );
};

export default App;
