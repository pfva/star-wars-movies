import { Box, Grid, List, ListItemButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
      <Typography variant='h3' component='h1' sx={{ fontFamily: 'Montserrat', fontWeight: 700, margin: '2rem auto' }}>
        Find your favorite Star Wars movie
      </Typography>
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
        {!selectedIndex ? (
          <h1>Select a movie to view details</h1>
        ) : (
          <Box padding='0 2rem'>
            <h2>{movies?.find((movie: Movie) => movie.episodeId === selectedIndex)?.title}</h2>
            <p>{movies?.find((movie: Movie) => movie.episodeId === selectedIndex)?.description}</p>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
