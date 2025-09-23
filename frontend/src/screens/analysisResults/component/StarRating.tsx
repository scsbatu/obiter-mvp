import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-legal-gold text-primary"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
};
