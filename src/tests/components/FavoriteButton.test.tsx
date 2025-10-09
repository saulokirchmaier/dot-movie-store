import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '../utils/test-utils';
import { FavoriteButton } from '@/components/MovieCard/FavoriteButton';
import userEvent from '@testing-library/user-event';

describe('FavoriteButton', () => {
  const mockProps = {
    movieId: '1',
    movieTitle: 'Test Movie',
    moviePrice: '29.90',
    movieImageURL: 'https://example.com/image.jpg',
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render heart icon', () => {
    const { container } = render(<FavoriteButton {...mockProps} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should start unfavorited', () => {
    const { container } = render(<FavoriteButton {...mockProps} />);

    const heart = container.querySelector('svg');
    expect(heart).toHaveAttribute('fill', 'none');
  });

  it('should add to favorites on click', async () => {
    const user = userEvent.setup();
    const { container } = render(<FavoriteButton {...mockProps} />);

    const heart = container.querySelector('svg');
    expect(heart).toHaveAttribute('fill', 'none');

    if (heart) {
      await user.click(heart);
    }

    await waitFor(() => {
      expect(heart).toHaveAttribute('fill', '#ff6b6b');
    });
  });

  it('should remove from favorites on second click', async () => {
    const user = userEvent.setup();
    const { container } = render(<FavoriteButton {...mockProps} />);

    const heart = container.querySelector('svg');

    if (heart) {
      // First click - add to favorites
      await user.click(heart);

      await waitFor(() => {
        expect(heart).toHaveAttribute('fill', '#ff6b6b');
      });

      // Second click - remove from favorites
      await user.click(heart);

      // Verifica que não está mais favorito (pode ficar com hover fill)
      const { container: newContainer } = render(
        <FavoriteButton {...mockProps} />
      );
      const newHeart = newContainer.querySelector('svg');

      expect(newHeart).toHaveAttribute('fill', 'none');
    }
  });

  it('should show burst animation when adding to favorites', async () => {
    const user = userEvent.setup();
    const { container } = render(<FavoriteButton {...mockProps} />);

    const heart = container.querySelector('svg');

    if (heart) {
      await user.click(heart);

      // Verifica que a animação é disparada (HeartBurst component)
      // O burst tem classe "pointer-events-none"
      await waitFor(() => {
        const burst = container.querySelector('.pointer-events-none');
        expect(burst).toBeInTheDocument();
      });
    }
  });

  it('should have hover effect', async () => {
    const user = userEvent.setup();
    const { container } = render(<FavoriteButton {...mockProps} />);

    const heart = container.querySelector('svg');

    if (heart) {
      await user.hover(heart);

      await waitFor(() => {
        expect(heart).toHaveAttribute('fill', '#ff6b6b75');
      });

      await user.unhover(heart);

      await waitFor(() => {
        expect(heart).toHaveAttribute('fill', 'none');
      });
    }
  });

  it('should have cursor-pointer class', () => {
    const { container } = render(<FavoriteButton {...mockProps} />);

    const heart = container.querySelector('svg');
    expect(heart).toHaveClass('cursor-pointer');
  });
});
