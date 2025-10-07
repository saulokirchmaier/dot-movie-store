import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/tmdb/movieService';
import type { Genre } from '@/types/movie.types';

/**
 * Hook para buscar lista de gêneros de filmes
 * Os gêneros são cacheados e não expiram durante a sessão
 */
export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => movieService.getGenres(),
    staleTime: Infinity, // Gêneros não mudam, mantém cache indefinidamente
    gcTime: Infinity, // Não remove do cache
  });
}

/**
 * Converte um ID de gênero para seu nome
 * @param genreId - ID do gênero
 * @param genres - Lista de gêneros
 * @returns Nome do gênero ou 'Desconhecido'
 */
export function getGenreName(
  genreId: number,
  genres: Genre[] | undefined
): string {
  if (!genres) return 'Carregando...';
  const genre = genres.find((g) => g.id === genreId);
  return genre?.name || 'Desconhecido';
}

/**
 * Converte array de IDs de gêneros para array de nomes
 * @param genreIds - Array de IDs de gêneros
 * @param genres - Lista de gêneros
 * @returns Array de nomes dos gêneros
 */
export function getGenreNames(
  genreIds: number[],
  genres: Genre[] | undefined
): string[] {
  if (!genres) return [];
  return genreIds
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre?.name;
    })
    .filter((name): name is string => name !== undefined);
}

/**
 * Retorna o primeiro gênero ou uma lista separada por vírgulas
 * @param genreIds - Array de IDs de gêneros
 * @param genres - Lista de gêneros
 * @param firstOnly - Se true, retorna apenas o primeiro gênero
 * @returns String com o(s) gênero(s)
 */
export function formatGenres(
  genreIds: number[],
  genres: Genre[] | undefined,
  firstOnly: boolean = true
): string {
  if (!genres) return 'Carregando...';
  if (!genreIds || genreIds.length === 0) return 'Sem gênero';

  const genreNames = getGenreNames(genreIds, genres);

  if (genreNames.length === 0) return 'Desconhecido';

  if (firstOnly) {
    return genreNames[0];
  }

  return genreNames.join(', ');
}
