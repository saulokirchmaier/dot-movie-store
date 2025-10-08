import { Heart, ShoppingCart, Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { useSearch, useFavorites, useShoppingCart } from '@/contexts';
import { FavoritesModal } from '../FavoritesModal';
import { ShoppingCartModal } from '../ShoppingCartModal';
import { useState } from 'react';

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { favoritesCount } = useFavorites();
  const { cartCount } = useShoppingCart();

  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isShoppingCartModalOpen, setIsShoppingCartModalOpen] = useState(false);
  return (
    <header className="bg-emerald-100 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_auto] gap-3 md:gap-4 items-center max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 lg:gap-4 order-1">
          <img
            src="/logo.png"
            alt="Dot Movies Store"
            className="w-8 h-8 lg:w-10 lg:h-10"
          />
          <h1 className="text-lg lg:text-2xl font-bold text-emerald-900">
            Movies Store
          </h1>
        </div>

        <div className="flex items-center gap-2 justify-self-end order-2 md:order-3">
          {/* Favorites Button */}
          <div className="relative">
            <div
              className="cursor-pointer rounded-full hover:bg-emerald-200 p-2 hover:scale-110 transition-all duration-300"
              onClick={() => setIsFavoritesModalOpen(true)}
            >
              <Heart size={24} className="text-emerald-900 lg:w-8 lg:h-8" />
            </div>
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>

          {/* Shopping Cart Button */}
          <div className="relative">
            <div
              className="cursor-pointer rounded-full hover:bg-emerald-200 p-2 hover:scale-110 transition-all duration-300"
              onClick={() => setIsShoppingCartModalOpen(true)}
            >
              <ShoppingCart
                size={24}
                className="text-emerald-900 lg:w-8 lg:h-8"
              />
            </div>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        <div className="relative w-full md:max-w-md md:justify-self-center col-span-2 md:col-span-1 order-3 md:order-2">
          <Input
            type="text"
            placeholder="Pesquisar filme"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full pr-10 text-black border-emerald-800 bg-white w-full"
          />
          {searchQuery ? (
            <X
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-800 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setSearchQuery('')}
            />
          ) : (
            <Search
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-800"
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
      />

      <ShoppingCartModal
        isOpen={isShoppingCartModalOpen}
        onClose={() => setIsShoppingCartModalOpen(false)}
      />
    </header>
  );
};

export default Header;
