import { Button, Grid, List, ListItemButton, ListItemText, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetchMovies from './hooks/useFetchMovies';
import { Movie } from './types';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<string>('');
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

  const sortByEpisodeAsc = () => {
    const sortedMovies = [...filteredMovies].sort((a: Movie, b: Movie) => a.episodeId - b.episodeId);
    setFilteredMovies(sortedMovies);
  };

  const sortByEpisodeDesc = () => {
    const sortedMovies = [...filteredMovies].sort((a: Movie, b: Movie) => b.episodeId - a.episodeId);
    setFilteredMovies(sortedMovies);
  };

  const sortByYearAsc = () => {
    const sortedMovies = [...filteredMovies].sort((a: Movie, b: Movie) => {
      const aDate = new Date(a.releaseDate);
      const bDate = new Date(b.releaseDate);
      return aDate.getTime() - bDate.getTime();
    });
    setFilteredMovies(sortedMovies);
  };

  const sortByYearDesc = () => {
    const sortedMovies = [...filteredMovies].sort((a: Movie, b: Movie) => {
      const aDate = new Date(a.releaseDate);
      const bDate = new Date(b.releaseDate);
      return bDate.getTime() - aDate.getTime();
    });
    setFilteredMovies(sortedMovies);
  };

  const handleFilterMovies = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter(value);
    const filteredMovies = movies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredMovies(filteredMovies);
  };

  return (
    <Grid container width='100vw'>
      <Grid item xs={12}>
        <TextField
          value={filter}
          label='Type to search'
          variant='outlined'
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleFilterMovies(event);
          }}
        />
      </Grid>
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
          {filteredMovies?.map((movie: Movie) => {
            const { title, episodeId, episodeName, releaseDate } = movie;
            return (
              <ListItemButton
                key={episodeId}
                selected={selectedIndex === episodeId}
                onClick={event => handleListItemClick(event, episodeId)}
              >
                <ListItemText data-testid='list-item-movie' primary={`${episodeName} - ${title} - ${releaseDate}`} />
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
            <h1>{movies?.find((movie: Movie) => movie.episodeId === selectedIndex)?.title}</h1>
            <p>{movies?.find((movie: Movie) => movie.episodeId === selectedIndex)?.description}</p>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
