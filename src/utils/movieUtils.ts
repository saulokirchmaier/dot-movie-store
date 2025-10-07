import type { Movie } from '@/types/movie.types';

/**
 * Gera um preço simulado baseado na popularidade e avaliação do filme
 * @param movie - Objeto do filme com dados do TMDb
 * @returns Preço formatado como string (ex: "12.50")
 */
export const generatePrice = (movie: Movie): string => {
  const basePrice = 9.9;
  const popularityFactor = movie.popularity / 100;
  const ratingFactor = movie.vote_average / 2;
  const price = basePrice + popularityFactor + ratingFactor;
  return price.toFixed(2);
};

/**
 * Formata uma data no formato YYYY-MM-DD para formato brasileiro
 * @param dateString - Data no formato YYYY-MM-DD
 * @returns Data formatada em português (ex: "15 de dezembro, 2023")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Data não disponível';

  const [year, month, day] = dateString.split('-');
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  return `${parseInt(day)} de ${months[parseInt(month) - 1]}, ${year}`;
};

/**
 * Gera URL completa da imagem do filme
 * @param posterPath - Caminho da imagem do TMDb
 * @param fallbackPath - Caminho de fallback caso não tenha imagem
 * @returns URL completa da imagem
 */
export const getMovieImageUrl = (
  posterPath: string | null,
  fallbackPath: string = '/cover.jpg'
): string => {
  if (!posterPath) return fallbackPath;
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

/**
 * Formata avaliação do filme para 1 casa decimal
 * @param voteAverage - Média de votos do filme
 * @returns Avaliação formatada
 */
export const formatRating = (voteAverage: number): number => {
  return parseFloat(voteAverage.toFixed(1));
};
