import { Button } from '../ui/button';
import { useFavorites } from '@/contexts';

export function FavoritesFooter() {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <div className="border-t border-neutral-700 p-6 bg-neutral-800 mt-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-neutral-400">
          {favorites.length} {favorites.length === 1 ? 'favorito' : 'favoritos'}
        </span>
        <div className="flex">
          <Button
            onClick={clearFavorites}
            className="flex-1 px-4 py-2 text-sm text-red-400 border border-red-400 rounded-md bg-transparent hover:bg-red-400 hover:text-white transition-colors"
            variant="outline"
          >
            Limpar Favoritos
          </Button>
        </div>
      </div>
    </div>
  );
}
