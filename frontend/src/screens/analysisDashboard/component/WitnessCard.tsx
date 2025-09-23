import { Badge } from "@/components/ui/badge";

interface Witness {
  id: number;
  name: string;
  role: string;
  description: string;
  additional: string[];
}

interface WitnessCardProps {
  witness: Witness;
  isSelected: boolean;
  onToggle: () => void;
}

export const WitnessCard = ({ witness, isSelected, onToggle }: WitnessCardProps) => {
  return (
    <div
      onClick={onToggle}
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-card/50 ${
        isSelected 
          ? 'border-legal-gold shadow-lg shadow-legal-gold/20' 
          : 'border-border hover:border-legal-gold/50'
      }`}
    >
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-foreground text-md leading-tight text-primary mb-2">
            {witness.name}
          </h4>
          <p className="text-xs text-legal-gold mt-1">
            {witness.role}
          </p>
        </div>
        
        <p className="text-xs leading-relaxed text">
          {witness.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {witness.additional.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs px-2 py-1 bg-card/50 text-legal-gold border-legal-gold/30 hover:bg-legal-gold/30"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-legal-gold/30">
          <div className="text-xs text-legal-gold font-medium">
            ✓ Selected for Analysis
          </div>
        </div>
      )}
    </div>
  );
};