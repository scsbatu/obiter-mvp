import { StarRating } from "./StarRating";
import { witnessResults } from "@/config/constants";

type CredibilityCardProps = {
  witness: typeof witnessResults[0];
};

export const CredibilityCard = ({ witness }: CredibilityCardProps) => {
  return (
    <div className="bg-light-white border border-border rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-primary">{witness.name}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {witness.credibilityScore}
          </div>
          <div className="text-sm text-white">/10</div>
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(witness.assessments).map(([key, rating]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-sm text-white capitalize">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
                str.toUpperCase()
              )}
            </span>
            <StarRating rating={rating} />
          </div>
        ))}
      </div>
    </div>
  );
};
