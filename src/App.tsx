import { Box, Grid, List, ListItemButton } from '@mui/material';
import { useEffect, useState } from 'react';
import MovieDetails from './components/MovieDetails/MovieDetails';
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

  const handleListItemClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Grid container width='100vw'>
      <Box sx={{ fontWeight: 700, margin: '2rem auto' }}>
        <h1>Find your favorite Star Wars movie</h1>
      </Box>
      <Grid item xs={12} display='flex' justifyContent='center'>
        <SearchField movies={movies} setFilteredMovies={setFilteredMovies} />
      </Grid>
      <Grid item xs={12}>
        <SortButton filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />
      </Grid>
      <Grid item xs={6}>
        <List>
          {filteredMovies?.map((movie: Movie) => {
            const { title, episodeId, episodeName, releaseDate } = movie;
            return (
              <ListItemButton
                divider
                key={episodeId}
                selected={selectedIndex === episodeId}
                onClick={event => handleListItemClick(event, episodeId)}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box data-testid='movie-episode-name'>{episodeName}</Box>
                <Box data-testid='movie-title'>{title}</Box>
                <Box data-testid='movie-release-date'>{releaseDate}</Box>
              </ListItemButton>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={6}>
        <MovieDetails selectedIndex={selectedIndex} movies={movies} />
      </Grid>
    </Grid>
  );
};

export default App;
