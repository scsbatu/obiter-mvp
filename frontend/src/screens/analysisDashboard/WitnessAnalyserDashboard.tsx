import { useState } from "react";
import { AnalysisProgress } from "../analysisProgress/AnalysisProgress";
import { AnalysisResults } from "../analysisResults/AnalysisResults";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectById } from "@/api/project";
import { AnalysisDashboard } from "./component/AnalyseDashboard";
import Loading from "@/components/Loading";

export const WitnessAnalyserDashboard = () => {
  const { id } = useParams();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate()

  const { data, isFetching, isLoading } = useGetProjectById(id);

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    navigate(`/projects/project-analyses-result-view/${id}`)
  };

  // if (showResults) {
  //   return <AnalysisResults />;
  // }

  const renderContent = () => {
    if (isAnalyzing) {
      return <AnalysisProgress onComplete={handleAnalysisComplete} />;
    }
    return <AnalysisDashboard setIsAnalyzing={setIsAnalyzing} />;
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen container bg-background text-foreground pt-20">
      <header className="bg-sidebar-bg border-b border-border mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground">
              Dashboard &gt; {data?.name} &gt;{" "}
              <span className="text-legal-gold">Witness Evidence Analyser</span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-primary">
              Witness Evidence Analysers
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:space-x-8 gap-4 lg:gap-0 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Case:</span>
              <span className="text-foreground">{data?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Court:</span>
              <span className="text-foreground">
                {data?.court || "Not mention"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Case No:</span>
              <span className="text-foreground">{data?.caseNo}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Type:</span>
              <span className="text-foreground">{data?.premisesLiability}</span>
            </div>
          </div>
        </div>
      </header>
      {renderContent()}
    </div>
  );
};
