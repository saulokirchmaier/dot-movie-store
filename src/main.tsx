import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from './contexts/SearchContext';
import { queryClient } from './lib/queryClient';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <App />
    </SearchProvider>
  </QueryClientProvider>
);
