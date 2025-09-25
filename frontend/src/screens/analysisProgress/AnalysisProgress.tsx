import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { analysisSteps } from "@/config/constants";

interface AnalysisProgressProps {
  onComplete?: () => void;
}

export const AnalysisProgress = ({ onComplete }: AnalysisProgressProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (currentStep < analysisSteps.length) {
      const step = analysisSteps[currentStep];
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => new Set([...prev, step.id]));
        setCurrentStep((prev) => prev + 1);
        setProgress(((currentStep + 1) / analysisSteps.length) * 100);
      }, step.duration);

      return () => clearTimeout(timer);
    } else if (currentStep === analysisSteps.length && onComplete) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentStep, onComplete]);

  return (
    <div>
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-legal-gold text-primary">
            Analysing Witness Evidence
          </h2>

          <div className="mb-2 flex items-center justify-between">
            <div className="flex-1 mr-4">
              <Progress value={progress} className="h-3 bg-muted" />
            </div>
            <div className="text-legal-gold font-bold text-lg">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {analysisSteps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            const isCurrent = currentStep === index && !isCompleted;
            return (
              <div
                key={step.id}
                className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                  isCompleted
                    ? "bg-light-gold/10 border border-legal-gold/30"
                    : isCurrent
                    ? "bg-light-gold/5 border border-legal-gold/20"
                    : "bg-card border border-border opacity-50"
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-primary" />
                  ) : (
                    <div
                      className={`h-6 w-6 rounded-full border-2 ${
                        isCurrent
                          ? "border-legal-gold animate-pulse"
                          : "border-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-lg font-medium mb-1 ${
                      isCompleted || isCurrent
                        ? "text-legal-gold"
                        : "text-black"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isCompleted || isCurrent
                        ? "text-foreground"
                        : "text-black"
                    }`}
                  >
                    {step.description}
                  </p>

                  {isCurrent && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin h-4 w-4 border-2 border-legal-gold border-t-transparent rounded-full"></div>
                        <span className="text-sm text-legal-gold">
                          Processing...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {progress === 100 && (
          <div className="mt-8 text-center">
            <div className="text-legal-gold text-lg font-medium mb-2">
              Analysis Complete!
            </div>
            <div className="text-white text-sm">
              Generating comprehensive examination scripts and insights...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
