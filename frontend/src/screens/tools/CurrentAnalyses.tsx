import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, ArrowRight } from "lucide-react";
import { tools } from "@/config/constants";
import { AnalysesCard } from "./component/AnalysesCard";

const CurrentAnalyses = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-20 mt-5">
        <div className="mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-3xl font-bold text-white mb-4">
              Legal Analysis Tools
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <AnalysesCard
                  title={tool.title}
                  description={tool.description}
                  features={tool.features}
                  icon={IconComponent}
                  onStart={() => {}}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CurrentAnalyses;
