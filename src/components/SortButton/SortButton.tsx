import FilterListIcon from '@mui/icons-material/FilterList';
import { List, ListItemButton, ListItemText, Popover } from '@mui/material';
import { useState } from 'react';
import { Movie, SortOptions, SortOrder } from '../../types';
import StyledSortButton from './styles';

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
    filteredMovies.length > 0 && (
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
    )
  );
};

export default SortButton;
