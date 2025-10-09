/* eslint-disable */
import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { AppProvider } from '@/contexts/AppProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

interface SimpleProvidersProps {
  children: ReactNode;
}

// Simple wrapper for components that don't need router
function SimpleProviders({ children }: SimpleProvidersProps) {
  return (
    <AppProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AppProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: SimpleProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
