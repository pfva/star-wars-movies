import { Grid, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import useFetchMovies from './hooks/useFetchMovies';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const { data: movies } = useFetchMovies();

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Grid container width='100vw'>
      <Grid item xs={6}>
        <List>
          {movies?.results?.map(movie => {
            const { title, episode_id } = movie;
            return (
              <ListItemButton
                key={episode_id}
                selected={selectedIndex === episode_id}
                onClick={event => handleListItemClick(event, episode_id)}
              >
                <ListItemText primary={`EPISODE ${episode_id} - ${title}`} />
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
            <h1>{movies?.results?.find(movie => movie.episode_id === selectedIndex)?.title}</h1>
            <p>{movies?.results?.find(movie => movie.episode_id === selectedIndex)?.opening_crawl}</p>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
