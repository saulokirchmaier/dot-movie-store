import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { MovieImage } from '@/components/MovieCard/MovieImage';

// Mock FavoriteButton
vi.mock('@/components/MovieCard/FavoriteButton', () => ({
  FavoriteButton: () => <div data-testid="favorite-button">FavoriteButton</div>,
}));

describe('MovieImage', () => {
  const defaultProps = {
    movieId: '1',
    movieTitle: 'Test Movie',
    moviePrice: '29.90',
    imageURL: 'https://example.com/movie.jpg',
    date: '2024',
  };

  it('should render placeholder image initially', () => {
    render(<MovieImage {...defaultProps} />);

    const placeholderImage = screen.getByAltText('Loading...');
    expect(placeholderImage).toBeInTheDocument();
    expect(placeholderImage).toHaveAttribute('src', '/cover.png');
  });

  it('should render movie image when imageURL is provided', () => {
    render(<MovieImage {...defaultProps} />);

    const movieImage = screen.getByAltText('Movie Poster');
    expect(movieImage).toBeInTheDocument();
    expect(movieImage).toHaveAttribute('src', defaultProps.imageURL);
  });

  it('should render FavoriteButton', () => {
    render(<MovieImage {...defaultProps} />);

    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });

  it('should display release date', () => {
    render(<MovieImage {...defaultProps} />);

    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('should handle different dates', () => {
    render(<MovieImage {...defaultProps} date="2023" />);

    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('should apply correct styling classes to container', () => {
    const { container } = render(<MovieImage {...defaultProps} />);

    const imageContainer = container.querySelector('.w-full.h-sm.bg-gray-100');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should render with empty imageURL', () => {
    render(<MovieImage {...defaultProps} imageURL="" />);

    const placeholderImage = screen.getByAltText('Loading...');
    expect(placeholderImage).toBeInTheDocument();
  });

  it('should show date with correct background styling', () => {
    render(<MovieImage {...defaultProps} />);

    const dateElement = screen.getByText('2024');
    expect(dateElement).toHaveClass('bg-gray-950/50');
  });
});
