import { Box, Button, Grid, List, ListItemButton, ListItemText, Popover, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetchMovies from './hooks/useFetchMovies';
import { Movie, SortOptions, SortOrder } from './types';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data } = useFetchMovies();

  useEffect(() => {
    if (data) {
      setMovies(data);
      setFilteredMovies(data);
    }
  }, [data]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleListItemClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const getSortFn = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string, order: SortOrder) => {
    switch (key) {
      case 'episode':
        return sortByEpisode(order);
      case 'year':
        return sortByYear(order);
      default:
        return;
    }
  };

  const sortByEpisode = (order: SortOrder) => {
    const sortedMovies = [...filteredMovies].sort((a: Movie, b: Movie) =>
      order === 'ascending' ? a.episodeId - b.episodeId : b.episodeId - a.episodeId
    );
    setFilteredMovies(sortedMovies);
    handleClose();
  };

  const sortByYear = (order: SortOrder) => {
    const sortedMovies = [...filteredMovies].sort((a: Movie, b: Movie) => {
      const aDate = new Date(a.releaseDate);
      const bDate = new Date(b.releaseDate);
      return order === 'ascending' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
    });
    setFilteredMovies(sortedMovies);
    handleClose();
  };

  const handleFilterMovies = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter(value);
    const filteredMovies = movies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredMovies(filteredMovies);
  };

  const sortOptions: SortOptions[] = [
    { key: 'episode', order: 'ascending' },
    { key: 'episode', order: 'descending' },
    { key: 'year', order: 'ascending' },
    { key: 'year', order: 'descending' },
  ];

  return (
    <Grid container width='100vw'>
      <Grid item xs={2}>
        <Button aria-describedby={id} variant='contained' onClick={handleClick}>
          Sort by
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <List>
            {sortOptions.map(option => {
              const { key, order } = option;
              return (
                <ListItemButton onClick={event => getSortFn(event, key, order)} key={key + order}>
                  <ListItemText primary={`Sort by ${key} (${order})`} />
                </ListItemButton>
              );
            })}
          </List>
        </Popover>
      </Grid>
      <Grid item xs={10}>
        <TextField
          value={filter}
          label='Type to search'
          variant='outlined'
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleFilterMovies(event);
          }}
          sx={{ marginTop: '1rem', marginBottom: '1rem' }}
        />
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
