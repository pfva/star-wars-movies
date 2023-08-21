import { Box, Grid, List, ListItemButton } from '@mui/material';
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
      <Grid item xs={2}>
        <SortButton filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies} />
      </Grid>
      <Grid item xs={10}>
        <SearchField movies={movies} setFilteredMovies={setFilteredMovies} />
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
            <h1>{movies?.find((movie: Movie) => movie.episodeId === selectedIndex)?.title}</h1>
            <p>{movies?.find((movie: Movie) => movie.episodeId === selectedIndex)?.description}</p>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
