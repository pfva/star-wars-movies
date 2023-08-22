import { Box, List, ListItemButton } from '@mui/material';
import { Movie } from '../../types';

interface MovieListProps {
  selectedIndex: number | undefined;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  filteredMovies: Movie[];
}

const MovieList = ({ selectedIndex, setSelectedIndex, filteredMovies }: MovieListProps) => {
  const handleListItemClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      {filteredMovies?.map((movie: Movie) => {
        const { title, episodeId, episodeName, releaseDate } = movie;
        return (
          <ListItemButton
            divider
            key={episodeId}
            selected={selectedIndex === episodeId}
            onClick={event => handleListItemClick(event, episodeId)}
            sx={{ display: 'flex', justifyContent: 'space-between', height: '4rem' }}
          >
            <Box data-testid='movie-episode-name'>{episodeName}</Box>
            <Box data-testid='movie-title'>{title}</Box>
            <Box data-testid='movie-release-date'>{releaseDate}</Box>
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default MovieList;
