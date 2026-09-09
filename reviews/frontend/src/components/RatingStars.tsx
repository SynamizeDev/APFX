import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showNumeric?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 16,
  showNumeric = false,
}) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= Math.floor(rating);
        const isHalf = !isFilled && starNumber === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <Star
            key={index}
            size={size}
            className={`${
              isFilled
                ? 'text-[#FFB800] fill-[#FFB800]'
                : isHalf
                ? 'text-[#FFB800] fill-[#FFB800]/50'
                : 'text-slate-700'
            } transition-colors duration-150`}
          />
        );
      })}
      {showNumeric && (
        <span className="ml-1.5 text-xs font-semibold text-white/90">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
