/* eslint-disable */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { MovieInfo } from '@/components/MovieCard/MovieInfo';

// Mock useMediaQuery
vi.mock('@/hooks/useMediaQuery', () => ({
  useIsMobile: vi.fn(() => false),
}));

describe('MovieInfo', () => {
  const defaultProps = {
    title: 'Teste Movie',
    genre: 'Ação',
    price: '29.90',
    rating: 8.5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render movie title', () => {
    render(<MovieInfo {...defaultProps} />);
    expect(screen.getByText('Teste Movie')).toBeInTheDocument();
  });

  it('should render genre', () => {
    render(<MovieInfo {...defaultProps} />);
    expect(screen.getByText('Ação')).toBeInTheDocument();
  });

  it('should render price with currency symbol', () => {
    render(<MovieInfo {...defaultProps} />);
    expect(screen.getByText('R$ 29.90')).toBeInTheDocument();
  });

  it('should render rating', () => {
    render(<MovieInfo {...defaultProps} />);
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('should render star icon', () => {
    const { container } = render(<MovieInfo {...defaultProps} />);
    const starIcon = container.querySelector('svg');
    expect(starIcon).toBeInTheDocument();
  });

  it('should truncate long titles', () => {
    const longTitle =
      'This is a very long movie title that should be truncated';
    render(<MovieInfo {...defaultProps} title={longTitle} />);

    const titleElement = screen.getByText(longTitle);
    expect(titleElement).toHaveClass('truncate');
  });

  it('should wrap title in tooltip trigger', () => {
    const { container } = render(<MovieInfo {...defaultProps} />);

    // Check that the title is wrapped in a tooltip component structure
    const titleElement = screen.getByText('Teste Movie');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.closest('[data-slot="tooltip-trigger"]')).toBeTruthy();
  });

  it('should display rating with correct precision', () => {
    render(<MovieInfo {...defaultProps} rating={7.856} />);
    expect(screen.getByText('7.856')).toBeInTheDocument();
  });

  it('should handle integer ratings', () => {
    render(<MovieInfo {...defaultProps} rating={8} />);
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('should handle zero rating', () => {
    render(<MovieInfo {...defaultProps} rating={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<MovieInfo {...defaultProps} />);

    const titleElement = screen.getByText('Teste Movie');
    expect(titleElement).toHaveClass('font-bold');
    expect(titleElement).toHaveClass('text-gray-900');

    const priceElement = screen.getByText('R$ 29.90');
    expect(priceElement).toHaveClass('font-bold');
    expect(priceElement).toHaveClass('text-gray-500');
  });

  it('should render all info sections', () => {
    const { container } = render(<MovieInfo {...defaultProps} />);

    // Check for title section
    expect(screen.getByText('Teste Movie')).toBeInTheDocument();

    // Check for rating and genre section
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('Ação')).toBeInTheDocument();

    // Check for price section
    expect(screen.getByText('R$ 29.90')).toBeInTheDocument();
  });
});
