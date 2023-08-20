import { Button, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetchMovies from './hooks/useFetchMovies';
import { Movie } from './types';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [movies, setMovies] = useState<any>([]);
  const { data } = useFetchMovies();

  useEffect(() => {
    setMovies(data);
  }, [data]);

  const handleListItemClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const sortByEpisodeAsc = () => {
    const sortedMovies = [...movies].sort((a: Movie, b: Movie) => a.episode - b.episode);
    setMovies(sortedMovies);
  };

  const sortByEpisodeDesc = () => {
    const sortedMovies = [...movies].sort((a: Movie, b: Movie) => b.episode - a.episode);
    setMovies(sortedMovies);
  };

  const sortByYearAsc = () => {
    const sortedMovies = [...movies].sort((a: Movie, b: Movie) => {
      const aDate = new Date(a.releaseDate);
      const bDate = new Date(b.releaseDate);
      return aDate.getTime() - bDate.getTime();
    });
    setMovies(sortedMovies);
  };

  const sortByYearDesc = () => {
    const sortedMovies = [...movies].sort((a: Movie, b: Movie) => {
      const aDate = new Date(a.releaseDate);
      const bDate = new Date(b.releaseDate);
      return bDate.getTime() - aDate.getTime();
    });
    setMovies(sortedMovies);
  };

  return (
    <Grid container width='100vw'>
      <Grid item xs={3}>
        <Button variant='contained' onClick={sortByEpisodeAsc}>
          Sort by episode (ascending)
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant='contained' onClick={sortByEpisodeDesc}>
          Sort by episode (descending)
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant='contained' onClick={sortByYearAsc}>
          Sort by year (ascending)
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant='contained' onClick={sortByYearDesc}>
          Sort by year (descending)
        </Button>
      </Grid>
      <Grid item xs={6}>
        <List>
          {movies?.map((movie: Movie) => {
            const { title, episode, releaseDate } = movie;
            return (
              <ListItemButton
                key={episode}
                selected={selectedIndex === episode}
                onClick={event => handleListItemClick(event, episode)}
              >
                <ListItemText
                  data-testid='list-item-movie'
                  primary={`EPISODE ${episode} - ${title} - ${releaseDate}`}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={6}>
        {!selectedIndex ? (
          <h1>Select a movie to view details</h1>
        ) : (
          <>
            <h1>{movies?.find((movie: Movie) => movie.episode === selectedIndex)?.title}</h1>
            <p>{movies?.find((movie: Movie) => movie.episode === selectedIndex)?.description}</p>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
