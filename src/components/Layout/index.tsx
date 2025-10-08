import type { ReactNode } from 'react';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode;
  disableSearch?: boolean;
}

export function Layout({ children, disableSearch = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header disableSearch={disableSearch} />
      <main className="mt-30 md:mt-20">{children}</main>
    </div>
  );
}
