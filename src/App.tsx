import { Grid, List, ListItemButton, ListItemText } from '@mui/material';
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

  return (
    <Grid container width='100vw'>
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
                <ListItemText primary={`EPISODE ${episode} - ${title} - ${releaseDate}`} />
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
