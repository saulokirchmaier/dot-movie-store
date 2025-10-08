import { Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface MovieInfoProps {
  title: string;
  rating: number;
  genre: string;
  price: string;
}

export function MovieInfo({ title, rating, genre, price }: MovieInfoProps) {
  const isMobile = useIsMobile();

  return (
    <div className="py-2 px-2 md:px-4 flex flex-col gap-1">
      <Tooltip>
        <TooltipTrigger>
          <h3 className="text-sm md:text-lg font-bold text-gray-900 truncate">
            {title}
          </h3>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-900 text-white font-bold">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center justify-evenly">
        <div className="flex items-center gap-1 md:gap-2">
          <Star size={isMobile ? 18 : 24} fill="#ffd700" stroke="#ffd700" />
          <p className="text-sm md:text-md text-gray-700 font-bold">{rating}</p>
        </div>
        <p className="text-xs md:text-md text-gray-500">{genre}</p>
      </div>

      <div>
        <p className="text-sm md:text-md text-gray-500 font-bold">R$ {price}</p>
      </div>
    </div>
  );
}
