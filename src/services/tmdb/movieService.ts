import apiClient from '../api/client';
import type {
  TMDbResponse,
  MovieSearchParams,
  GenreResponse,
} from '@/types/movie.types';

export const movieService = {
  /**
   * Busca filmes populares com paginação
   */
  async getPopularMovies(page: number = 1): Promise<TMDbResponse> {
    const { data } = await apiClient.get<TMDbResponse>('/movie/popular', {
      params: {
        page,
        language: 'pt-BR',
        include_adult: false,
        sort_by: 'popularity.desc',
      },
    });
    return data;
  },

  /**
   * Busca filmes por termo de pesquisa
   */
  async searchMovies(params: MovieSearchParams): Promise<TMDbResponse> {
    const { data } = await apiClient.get<TMDbResponse>('/search/movie', {
      params: {
        query: params.query || '',
        page: params.page || 1,
        language: 'pt-BR',
        include_adult: false,
      },
    });
    return data;
  },

  /**
   * Busca lista de gêneros de filmes
   */
  async getGenres(): Promise<GenreResponse> {
    const { data } = await apiClient.get<GenreResponse>('/genre/movie/list', {
      params: {
        language: 'pt-BR',
      },
    });
    return data;
  },
};

export default movieService;
