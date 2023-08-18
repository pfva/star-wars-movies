import useFetchMovies from './hooks/useFetchMovies';

const App = () => {
  const { data: movies } = useFetchMovies();

  return (
    <>
      {movies?.results?.map(movie => (
        <li key={movie.episode_id}>{movie.title}</li>
      ))}
    </>
  );
};

export default App;
