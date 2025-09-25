import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WitnessCard } from "./WitnessCard";
import { expertWitnesses, layWitnesses } from "@/config/constants";
import { useParams } from "react-router-dom";

export const AnalysisDashboard = ({setIsAnalyzing}:any) => {
  const { id } = useParams();
  const [layWitnessesExpanded, setLayWitnessesExpanded] = useState(true);
  const [expertWitnessesExpanded, setExpertWitnessesExpanded] = useState(true);
  const [selectedWitnesses, setSelectedWitnesses] = useState<Set<number>>(
    new Set()
  );

  const toggleWitnessSelection = (id: number) => {
    const newSelection = new Set(selectedWitnesses);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedWitnesses(newSelection);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
  };

  return (
      <div className="p-4 m-3 md:p-6 bg-light-white border border-border rounded">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 text-primary">
            Select Witnesses to Analyser
          </h2>
          <div className="mb-8">
            <button
              onClick={() => setLayWitnessesExpanded(!layWitnessesExpanded)}
              className="flex items-center space-x-2 text-lg font-medium text-legal-gold mb-4 hover:text-legal-gold/80 transition-colors"
            >
              {layWitnessesExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
              <span>Lay Witnesses</span>
            </button>

            {layWitnessesExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {layWitnesses.map((witness) => (
                  <WitnessCard
                    key={witness.id}
                    witness={witness}
                    isSelected={selectedWitnesses.has(witness.id)}
                    onToggle={() => toggleWitnessSelection(witness.id)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mb-8">
            <button
              onClick={() =>
                setExpertWitnessesExpanded(!expertWitnessesExpanded)
              }
              className="flex items-center space-x-2 text-lg font-medium text-legal-gold mb-4 hover:text-legal-gold/80 transition-colors"
            >
              {expertWitnessesExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
              <span>Expert Witnesses</span>
            </button>
            {expertWitnessesExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {expertWitnesses.map((witness) => (
                  <WitnessCard
                    key={witness.id}
                    witness={witness}
                    isSelected={selectedWitnesses.has(witness.id)}
                    onToggle={() => toggleWitnessSelection(witness.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            Analysis Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm mb-2">Examination Type</label>
              <Select defaultValue="examination-in-chief">
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="examination-in-chief">
                    Examination In Chief
                  </SelectItem>
                  <SelectItem value="cross-examination">
                    Cross Examination
                  </SelectItem>
                  <SelectItem value="re-examination">Re-examination</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2">Analysis Output</label>
              <Select defaultValue="full-examination-script">
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-examination-script">
                    Full Examination Script
                  </SelectItem>
                  <SelectItem value="key-points-summary">
                    Key Points Summary
                  </SelectItem>
                  <SelectItem value="question-suggestions">
                    Question Suggestions
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm mb-6">
            Estimated Processing Time: 1-2 minutes 2-3 minutes for selected
            witnesses
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              className="bg-accent border-border text-black w-full sm:w-auto"
              onClick={startAnalysis}
            >
              Save Configuration
            </Button>
            <Button
              className="bg-accent border-border text-black w-full sm:w-auto"
              onClick={startAnalysis}
            >
              Start Analysis
            </Button>
          </div>
        </div>
      </div>
  );
};
