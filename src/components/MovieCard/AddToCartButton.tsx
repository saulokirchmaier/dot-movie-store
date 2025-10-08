import { Button } from '../ui/button';
import { useShoppingCart } from '@/contexts';

interface AddToCartButtonProps {
  movieId: string;
  movieTitle: string;
  moviePrice: string;
  movieImageURL: string;
}

export function AddToCartButton({
  movieId,
  movieTitle,
  moviePrice,
  movieImageURL,
}: AddToCartButtonProps) {
  const { addToCart } = useShoppingCart();

  const handleAddToCartClick = () => {
    addToCart({
      id: movieId,
      title: movieTitle,
      price: moviePrice,
      imageURL: movieImageURL,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <Button
      className="w-full bg-emerald-700 hover:bg-emerald-500 transition-colors duration-300 cursor-pointer"
      onClick={handleAddToCartClick}
    >
      <p className="text-md text-white font-bold">Adicionar</p>
    </Button>
  );
}
