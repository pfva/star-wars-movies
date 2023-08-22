import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { Movie } from '../../types';
import StyledTextField from './styles';

interface SearchFieldProps {
  movies: Movie[];
  setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const SearchField = ({ movies, setFilteredMovies }: SearchFieldProps) => {
  const [filter, setFilter] = useState<string>('');

  const handleFilterMovies = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter(value);
    const filteredMovies = movies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredMovies(filteredMovies);
  };

  return (
    <StyledTextField
      value={filter}
      variant='outlined'
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleFilterMovies(event);
      }}
      data-testid='search-field'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ width: '50%', marginTop: '2rem', marginBottom: '1rem', color: 'white' }}
    />
  );
};

export default SearchField;
