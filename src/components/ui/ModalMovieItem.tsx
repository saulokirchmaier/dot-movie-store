import { ShoppingCart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { useShoppingCart } from '@/contexts';

interface ModalMovieItemProps {
  id: string;
  title: string;
  imageURL: string;
  price: string;
  isFavoriteModal?: boolean;
  removeLabel: string;
  onRemove: (id: string) => void;
}

export function ModalMovieItem({
  id,
  title,
  imageURL,
  price,
  isFavoriteModal = false,
  removeLabel,
  onRemove,
}: ModalMovieItemProps) {
  const { addToCart } = useShoppingCart();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors relative"
    >
      {/* Movie Image */}
      <div className="w-16 h-24 bg-neutral-600 rounded-md overflow-hidden flex-shrink-0">
        {imageURL ? (
          <img
            src={imageURL}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="/cover.png"
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Movie Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-neutral-100">{title}</h4>
        <p className="text-sm text-emerald-400 font-semibold">R$ {price}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={() => onRemove(id)}
              className="p-2 rounded-full hover:bg-neutral-700 transition-colors cursor-pointer hover:scale-110 text-neutral-400 hover:text-red-400"
              aria-label={`Remover ${title} do carrinho`}
            >
              <Trash2 size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{removeLabel}</p>
          </TooltipContent>
        </Tooltip>

        {isFavoriteModal && (
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={() =>
                  addToCart({
                    id,
                    title,
                    price,
                    imageURL,
                    addedAt: new Date().toISOString(),
                  })
                }
                className="p-2 rounded-full hover:bg-neutral-700 transition-colors cursor-pointer hover:scale-110 text-neutral-400 hover:text-green-400"
                aria-label={`Remover ${title} do carrinho`}
              >
                <ShoppingCart size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar ao carrinho</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </motion.div>
  );
}
