import type { ReactNode } from 'react';
import { AppProvider } from '@/contexts/AppProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

interface SimpleProvidersProps {
  children: ReactNode;
}

// Simple wrapper for components that don't need router
export function SimpleProviders({ children }: SimpleProvidersProps) {
  return (
    <AppProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AppProvider>
  );
}
