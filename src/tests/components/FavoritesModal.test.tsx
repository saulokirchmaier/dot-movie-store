import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { FavoritesModal } from '@/components/FavoritesModal';
import { useFavorites } from '@/contexts';

// Mock contexts
vi.mock('@/contexts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/contexts')>();
  return {
    ...actual,
    useFavorites: vi.fn(),
  };
});

const mockUseFavorites = useFavorites as unknown as ReturnType<typeof vi.fn>;

describe('FavoritesModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFavorites.mockReturnValue({
      favorites: [],
      favoritesCount: 0,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      clearFavorites: vi.fn(),
    });
  });

  it('should not render when isOpen is false', () => {
    render(<FavoritesModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Meus Favoritos')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Meus Favoritos')).toBeInTheDocument();
  });

  it('should show empty state when no favorites', () => {
    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Nenhum favorito ainda')).toBeInTheDocument();
    expect(
      screen.getByText('Adicione filmes aos seus favoritos para vê-los aqui')
    ).toBeInTheDocument();
  });

  it('should display favorites when they exist', () => {
    mockUseFavorites.mockReturnValue({
      ...mockUseFavorites(),
      favorites: [
        {
          id: '1',
          title: 'Test Movie',
          imageURL: 'test.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
      ],
      favoritesCount: 1,
    });

    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('should display favorites count', () => {
    mockUseFavorites.mockReturnValue({
      ...mockUseFavorites(),
      favorites: [
        {
          id: '1',
          title: 'Movie 1',
          imageURL: 'test1.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Movie 2',
          imageURL: 'test2.jpg',
          price: '39.90',
          addedAt: new Date().toISOString(),
        },
      ],
      favoritesCount: 2,
    });

    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('2 favoritos')).toBeInTheDocument();
  });

  it('should display singular form for count of 1', () => {
    mockUseFavorites.mockReturnValue({
      ...mockUseFavorites(),
      favorites: [
        {
          id: '1',
          title: 'Movie 1',
          imageURL: 'test1.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
      ],
      favoritesCount: 1,
    });

    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('1 favorito')).toBeInTheDocument();
  });

  it('should show clear favorites button when favorites exist', () => {
    mockUseFavorites.mockReturnValue({
      ...mockUseFavorites(),
      favorites: [
        {
          id: '1',
          title: 'Movie 1',
          imageURL: 'test1.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
      ],
      favoritesCount: 1,
    });

    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Limpar Favoritos')).toBeInTheDocument();
  });

  it('should not show footer when no favorites', () => {
    render(<FavoritesModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.queryByText('Limpar Favoritos')).not.toBeInTheDocument();
  });
});
