import { describe, it, expect } from 'vitest';
import {
  formatRating,
  formatDate,
  generatePrice,
  getMovieImageUrl,
} from '@/utils/movieUtils';
import type { Movie } from '@/types/movie.types';

describe('movieUtils', () => {
  describe('formatRating', () => {
    it('should format rating to one decimal place', () => {
      expect(formatRating(7.856)).toBe(7.9);
      expect(formatRating(8.12)).toBe(8.1);
      expect(formatRating(9.949)).toBe(9.9); // Should round down
    });

    it('should handle integer ratings', () => {
      expect(formatRating(8)).toBe(8.0);
      expect(formatRating(10)).toBe(10.0);
    });

    it('should handle zero', () => {
      expect(formatRating(0)).toBe(0.0);
    });

    it('should round correctly', () => {
      expect(formatRating(7.84)).toBe(7.8);
      expect(formatRating(7.86)).toBe(7.9);
    });
  });

  describe('formatDate', () => {
    it('should format valid date string', () => {
      expect(formatDate('2024-03-15')).toBe('15 de março, 2024');
      expect(formatDate('2023-12-31')).toBe('31 de dezembro, 2023');
    });

    it('should handle empty or invalid dates', () => {
      expect(formatDate('')).toBe('Data não disponível');
    });

    it('should format dates with leading zeros', () => {
      expect(formatDate('2024-01-01')).toBe('1 de janeiro, 2024');
      expect(formatDate('2024-05-09')).toBe('9 de maio, 2024');
    });
  });

  describe('generatePrice', () => {
    it('should generate price based on movie data', () => {
      const mockMovie: Movie = {
        id: 1,
        title: 'Test Movie',
        overview: 'Test overview',
        poster_path: '/test.jpg',
        backdrop_path: '/backdrop.jpg',
        release_date: '2024-01-01',
        vote_average: 8.0,
        vote_count: 1000,
        popularity: 100,
        genre_ids: [28],
        original_language: 'en',
        original_title: 'Test Movie',
        adult: false,
        video: false,
      };

      const price = generatePrice(mockMovie);
      expect(price).toBeTruthy();
      expect(typeof price).toBe('string');
      expect(parseFloat(price)).toBeGreaterThan(0);
    });

    it('should return different prices for different movies', () => {
      const movie1: Movie = {
        id: 1,
        title: 'Movie 1',
        overview: 'Test',
        poster_path: '/test.jpg',
        backdrop_path: null,
        release_date: '2024-01-01',
        vote_average: 5.0,
        vote_count: 100,
        popularity: 50,
        genre_ids: [28],
        original_language: 'en',
        original_title: 'Movie 1',
        adult: false,
        video: false,
      };

      const movie2: Movie = {
        ...movie1,
        id: 2,
        vote_average: 9.0,
        popularity: 200,
      };

      const price1 = parseFloat(generatePrice(movie1));
      const price2 = parseFloat(generatePrice(movie2));

      expect(price2).toBeGreaterThan(price1);
    });
  });

  describe('getMovieImageUrl', () => {
    it('should return full image URL for valid poster path', () => {
      const url = getMovieImageUrl('/test-poster.jpg');
      expect(url).toContain('/w500/test-poster.jpg');
    });

    it('should return fallback for null poster path', () => {
      const url = getMovieImageUrl(null);
      expect(url).toBe('/cover.jpg');
    });

    it('should use custom fallback when provided', () => {
      const url = getMovieImageUrl(null, '/custom-fallback.jpg');
      expect(url).toBe('/custom-fallback.jpg');
    });
  });
});
