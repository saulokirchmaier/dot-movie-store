import {
  usePopularMovies,
  useSearchMovies,
  flattenMovies,
} from '@/hooks/useMovies';
import { useGenres, formatGenres } from '@/hooks/useGenres';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/contexts';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieCard from '@/components/MovieCard';
import {
  generatePrice,
  formatDate,
  getMovieImageUrl,
  formatRating,
} from '@/utils/movieUtils';
import { Loader2 } from 'lucide-react';

const MovieList = () => {
  const { searchQuery } = useSearch();
  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 500);

  const isSearching = debouncedSearchQuery.length > 0;

  const popularMoviesQuery = usePopularMovies();
  const searchMoviesQuery = useSearchMovies(debouncedSearchQuery);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = isSearching ? searchMoviesQuery : popularMoviesQuery;

  const { data: genresData } = useGenres();
  const genres = genresData?.genres;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const movies = flattenMovies(data?.pages ?? []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center flex flex-col items-center justify-center">
          <Loader2 className="h-16 w-16 text-emerald-500 animate-spin mb-4" />
          <p className="mt-4 text-emerald-800">Carregando filmes...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Erro ao carregar filmes</p>
          <p className="text-sm">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto p-4 pb-10">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
        {isSearching
          ? `Resultados para "${debouncedSearchQuery}"`
          : 'Filmes Populares'}
      </h2>

      {movies.length === 0 && !isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-xl text-gray-600">
              {isSearching
                ? 'Nenhum filme encontrado para sua busca'
                : 'Nenhum filme disponível no momento'}
            </p>
            {isSearching && (
              <p className="text-sm text-gray-500 mt-2">
                Tente pesquisar com outros termos
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id.toString()}
                imageURL={getMovieImageUrl(movie.poster_path)}
                title={movie.title}
                genre={formatGenres(movie.genre_ids, genres, true)}
                price={generatePrice(movie)}
                date={formatDate(movie.release_date)}
                rating={formatRating(movie.vote_average)}
              />
            ))}
          </div>

          <div ref={ref} className="py-8 text-center">
            {isFetchingNextPage && (
              <div className="flex flex-col gap-4 justify-center items-center">
                <Loader2 className="h-16 w-16 text-emerald-500 animate-spin mb-4" />
                <p className="text-gray-500">Carregando mais filmes...</p>
              </div>
            )}
            {!hasNextPage && movies.length > 0 && (
              <p className="text-gray-500">
                {isSearching
                  ? 'Esses são todos os resultados'
                  : 'Todos os filmes foram carregados'}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
