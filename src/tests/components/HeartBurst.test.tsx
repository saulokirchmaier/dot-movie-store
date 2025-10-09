import { describe, it, expect } from 'vitest';
import { render } from '../utils/test-utils';
import { HeartBurst } from '@/components/ui/HeartBurst';

describe('HeartBurst', () => {
  it('should not render when isActive is false', () => {
    const { container } = render(<HeartBurst isActive={false} />);

    const burstElements = container.querySelectorAll('.pointer-events-none');
    expect(burstElements.length).toBe(0);
  });

  it('should render when isActive is true', () => {
    const { container } = render(<HeartBurst isActive={true} />);

    const burstContainer = container.querySelector('.pointer-events-none');
    expect(burstContainer).toBeInTheDocument();
  });

  it('should render 8 particles', () => {
    const { container } = render(<HeartBurst isActive={true} />);

    // Each particle is a div with w-2 h-2 rounded-full
    const particles = container.querySelectorAll('.w-2.h-2.rounded-full');
    expect(particles.length).toBe(8);
  });

  it('should render expanding circle', () => {
    const { container } = render(<HeartBurst isActive={true} />);

    // Look for the circle with border
    const circle = container.querySelector('.border-2.border-red-400');
    expect(circle).toBeInTheDocument();
  });

  it('should have correct positioning', () => {
    const { container } = render(<HeartBurst isActive={true} />);

    const burstContainer = container.querySelector('.pointer-events-none');
    expect(burstContainer).toHaveClass('absolute');
  });

  it('particles should have gradient background', () => {
    const { container } = render(<HeartBurst isActive={true} />);

    const particles = container.querySelectorAll('.w-2.h-2.rounded-full');
    const firstParticle = particles[0] as HTMLElement;

    expect(firstParticle.style.background).toContain('linear-gradient');
  });

  it('should not render particles when inactive', () => {
    const { container } = render(<HeartBurst isActive={false} />);

    const particles = container.querySelectorAll('.w-2.h-2.rounded-full');
    expect(particles.length).toBe(0);
  });
});
