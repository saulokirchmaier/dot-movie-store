import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModalMovieItemProps {
  id: string;
  title: string;
  imageURL: string | null;
  subtitle: string | React.ReactNode;
  onRemove: (id: string) => void;
}

export function ModalMovieItem({
  id,
  title,
  imageURL,
  subtitle,
  onRemove,
}: ModalMovieItemProps) {
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
        {typeof subtitle === 'string' ? (
          <p className="text-sm text-neutral-400">{subtitle}</p>
        ) : (
          subtitle
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="p-2 rounded-full hover:bg-neutral-700 transition-colors cursor-pointer hover:scale-110 absolute right-2 top-2 text-neutral-400 hover:text-red-400"
        aria-label={`Remover ${title} do carrinho`}
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}
