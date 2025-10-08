import { Modal } from '../ui/Modal';
import { useFavorites } from '@/contexts';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Meus Favoritos">
      <div className="flex flex-col h-[calc(100vh-150px)] md:h-[calc(100vh-80px)]">
        {/* Scroll Area - Content */}
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
                <div
                  key={movie.id}
                  className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors relative"
                >
                  {/* Movie Image */}
                  <div className="w-16 h-24 bg-neutral-600 rounded-md overflow-hidden flex-shrink-0">
                    {movie.imageURL ? (
                      <img
                        src={movie.imageURL}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-neutral-400 text-xs">
                          Sem imagem
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-neutral-100">
                      {movie.title}
                    </h4>
                    <p className="text-sm text-neutral-400">
                      Adicionado em{' '}
                      {new Date(movie.addedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className="p-2 rounded-full hover:bg-neutral-700 transition-colors cursor-pointer hover:scale-110 absolute right-2 top-2 text-neutral-400 hover:text-red-400"
                    aria-label={`Remover ${movie.title} dos favoritos`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Sempre Fixo */}
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
