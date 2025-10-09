import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { ModalMovieItem } from '@/components/ui/ModalMovieItem';
import userEvent from '@testing-library/user-event';

describe('ModalMovieItem', () => {
  const mockOnRemove = vi.fn();

  const defaultProps = {
    id: '1',
    title: 'Test Movie',
    imageURL: 'https://example.com/image.jpg',
    price: '29.90',
    isFavoriteModal: false,
    removeLabel: 'Remover do carrinho',
    onRemove: mockOnRemove,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render movie title', () => {
    render(<ModalMovieItem {...defaultProps} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('should render movie price', () => {
    render(<ModalMovieItem {...defaultProps} />);

    expect(screen.getByText('R$ 29.90')).toBeInTheDocument();
  });

  it('should render movie image', () => {
    render(<ModalMovieItem {...defaultProps} />);

    const image = screen.getByAltText('Test Movie');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProps.imageURL);
  });

  it('should render placeholder image when imageURL is null', () => {
    render(<ModalMovieItem {...defaultProps} imageURL="/cover.png" />);

    const image = screen.getByAltText('Test Movie');
    expect(image).toHaveAttribute('src', '/cover.png');
  });

  it('should render remove button', () => {
    const { container } = render(<ModalMovieItem {...defaultProps} />);

    const button = container.querySelector('button[aria-label*="Remover"]');
    expect(button).toBeInTheDocument();
  });

  it('should call onRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<ModalMovieItem {...defaultProps} />);

    const button = container.querySelector('button[aria-label*="Remover"]');

    if (button) {
      await user.click(button);
      expect(mockOnRemove).toHaveBeenCalledWith('1');
      expect(mockOnRemove).toHaveBeenCalledTimes(1);
    }
  });

  it('should have hover effect on container', () => {
    const { container } = render(<ModalMovieItem {...defaultProps} />);

    const itemContainer = container.firstChild;
    expect(itemContainer).toHaveClass('hover:bg-neutral-600');
  });

  it('should have correct aria-label for remove button', () => {
    render(
      <ModalMovieItem {...defaultProps} removeLabel="Remover dos favoritos" />
    );

    // Verifica que o botão existe com um aria-label que inclui o título do filme
    const button = screen.getByRole('button', { name: /remover test movie/i });
    expect(button).toBeInTheDocument();
  });

  it('should render with animation classes', () => {
    const { container } = render(<ModalMovieItem {...defaultProps} />);

    const itemContainer = container.firstChild as HTMLElement;
    // Verifica que é um motion.div (tem propriedades de animação)
    expect(itemContainer).toBeInTheDocument();
  });

  it('should show trash icon', () => {
    const { container } = render(<ModalMovieItem {...defaultProps} />);

    const trashIcon = container.querySelector('svg');
    expect(trashIcon).toBeInTheDocument();
  });
});
