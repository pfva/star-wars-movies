import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { Movie } from '../../types';
import StyledTextField from './styles';
import { Close } from '@mui/icons-material';

interface SearchFieldProps {
  movies: Movie[];
  setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const SearchField = ({ movies, setFilteredMovies }: SearchFieldProps) => {
  const [filter, setFilter] = useState<string>('');

  // Could be improved by using a debounce function if the list of movies is very large
  const handleFilterMovies = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter(value);
    const filteredMovies = movies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredMovies(filteredMovies);
  };

  const clearFilter = () => {
    setFilter('');
    setFilteredMovies(movies);
  };

  return (
    <StyledTextField
      value={filter}
      variant='outlined'
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleFilterMovies(event);
      }}
      inputProps={{ 'data-testid': 'search-field' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={clearFilter} edge='end'>
              {filter && <Close fontSize='large' data-testid='clear-filter' />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ width: '50%', marginTop: '2rem', marginBottom: '1rem', color: 'white' }}
    />
  );
};

export default SearchField;
