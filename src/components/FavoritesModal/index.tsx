import { Modal } from '../ui/Modal';
import { ModalMovieItem } from '../ui/ModalMovieItem';
import { useFavorites } from '@/contexts';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Meus Favoritos">
      <div className="flex flex-col h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-y-auto p-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Heart size={80} className="text-neutral-600 mb-4" />
              <h3 className="text-lg font-medium text-neutral-300 mb-2">
                Nenhum favorito ainda
              </h3>
              <p className="text-neutral-500 text-sm">
                Adicione filmes aos seus favoritos para vê-los aqui
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((movie) => (
                <ModalMovieItem
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imageURL={movie.imageURL}
                  subtitle={
                    <p className="text-sm text-emerald-400 font-semibold">
                      R$ {movie.price}
                    </p>
                  }
                  onRemove={removeFavorite}
                />
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="border-t border-neutral-700 p-6 bg-neutral-800 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-neutral-400">
                {favorites.length}{' '}
                {favorites.length === 1 ? 'favorito' : 'favoritos'}
              </span>
              <div className="flex">
                <Button
                  onClick={clearFavorites}
                  className="flex-1 px-4 py-2 text-sm text-red-400 border border-red-400 rounded-md bg-transparent hover:bg-red-400 hover:text-white transition-colors"
                  variant="outline"
                >
                  Limpar todos
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
