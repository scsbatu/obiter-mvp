import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, ArrowRight } from "lucide-react";
import { tools } from "@/config/constants";

const CurrentAnalyses = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-4xl font-bold text-foreground mb-4">
              Legal Analysis Tools
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/50 border-primary/30 hover:border-primary/50 transition-all duration-300 group"
                >
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">
                        {tool.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <div className="mb-8 space-y-3">
                      {tool.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      size="lg"
                    >
                      Start Analysis
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CurrentAnalyses;
