import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Movie } from '../../types';

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
    <TextField
      value={filter}
      label='Type to search'
      variant='outlined'
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleFilterMovies(event);
      }}
    />
  );
};

export default SearchField;
