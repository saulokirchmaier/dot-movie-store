import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heart } from 'lucide-react';

describe('EmptyState', () => {
  it('should render with correct title and description', () => {
    render(
      <EmptyState
        icon={Heart}
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should render the icon', () => {
    const { container } = render(
      <EmptyState
        icon={Heart}
        title="Test Title"
        description="Test Description"
      />
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    const { container } = render(
      <EmptyState
        icon={Heart}
        title="Test Title"
        description="Test Description"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center');
  });
});
