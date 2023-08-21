import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, styled } from '@mui/material';
import React, { useState } from 'react';
import { Movie } from '../../types';

const StyledTextField = styled(TextField)({
  backgroundColor: '#F5F5F5',
  borderRadius: '0.3rem',
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

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
