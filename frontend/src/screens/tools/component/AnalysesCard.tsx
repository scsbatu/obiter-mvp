import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface AnalysesCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  onStart?: () => void;
}

export function AnalysesCard({
  title,
  description,
  features,
  icon: IconComponent,
  onStart,
}: AnalysesCardProps) {
  return (
    <Card className="bg-card/5 hover:bg-card/10 border-primary/30 hover:border-primary/50 transition-all duration-300 group">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
          <p className="text-light-gold leading-relaxed">{description}</p>
        </div>
        <div className="mb-8 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-white">{feature}</span>
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          size="lg"
          onClick={onStart}
        >
          Start Analysis
        </Button>
      </CardContent>
    </Card>
  );
}
