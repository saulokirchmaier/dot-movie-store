import { useInfiniteQuery } from '@tanstack/react-query';
import { movieService } from '@/services/tmdb/movieService';
import type { Movie } from '@/types/movie.types';

/**
 * Hook para buscar filmes populares com paginação infinita
 */
export function usePopularMovies() {
  return useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = 1 }) => movieService.getPopularMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

/**
 * Hook para buscar filmes por termo de pesquisa com paginação infinita
 */
export function useSearchMovies(query: string) {
  return useInfiniteQuery({
    queryKey: ['movies', 'search', query],
    queryFn: ({ pageParam = 1 }) =>
      movieService.searchMovies({
        query,
        page: pageParam,
        language: 'pt-BR',
        include_adult: false,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!query && query.length > 0, // Só executa se houver query
    initialPageParam: 1,
  });
}

/**
 * Utilitário para extrair todos os filmes das páginas
 */
export function flattenMovies(
  pages: { results: Movie[] }[] | undefined
): Movie[] {
  return pages?.flatMap((page) => page.results) ?? [];
}
