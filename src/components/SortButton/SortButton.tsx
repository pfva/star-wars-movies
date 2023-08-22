import { Button, List, ListItemButton, ListItemText, Popover, styled } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { Movie, SortOptions, SortOrder } from '../../types';

const StyledSortButton = styled(Button)({
  margin: '1rem',
  color: '#A0AAB4',
  borderColor: '#6F7E8C',
  '&:hover': {
    borderColor: '#B2BAC2',
  },
});

const sortOptions: SortOptions[] = [
  { key: 'episode', order: 'ascending' },
  { key: 'episode', order: 'descending' },
  { key: 'year', order: 'ascending' },
  { key: 'year', order: 'descending' },
];

interface SortButtonProps {
  filteredMovies: Movie[];
  setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const SortButton = ({ filteredMovies, setFilteredMovies }: SortButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
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
    handlePopoverClose();
  };

  const sortByYear = (order: SortOrder) => {
    const sortedMovies = [...filteredMovies].sort((a: Movie, b: Movie) => {
      const aDate = new Date(a.releaseDate);
      const bDate = new Date(b.releaseDate);
      return order === 'ascending' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
    });
    setFilteredMovies(sortedMovies);
    handlePopoverClose();
  };

  return (
    <>
      <StyledSortButton
        size='large'
        aria-describedby={id}
        variant='outlined'
        onClick={handlePopoverOpen}
        startIcon={<FilterListIcon />}
      >
        Sort by
      </StyledSortButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
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
    </>
  );
};

export default SortButton;
