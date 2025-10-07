/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

/**
 * Hook para acessar o contexto de busca
 * @returns {SearchContextType} Objeto com searchQuery e setSearchQuery
 * @throws {Error} Se usado fora do SearchProvider
 *
 * @example
 * const { searchQuery, setSearchQuery } = useSearch();
 * setSearchQuery('Matrix');
 */
export function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
}
