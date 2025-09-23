import { Upload, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-3">
        Quick Actions
      </h3>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start h-8 text-xs">
          <Upload className="h-3 w-3 mr-2" />
          Upload Document
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start h-8 text-xs"
          onClick={() => navigate("/projects/project-analyses-view")}
        >
          <FileText className="h-3 w-3 mr-2" />
          Analyse Selected
        </Button>
        <Button variant="outline" className="w-full justify-start h-8 text-xs">
          <Search className="h-3 w-3 mr-2" />
          Search Documents
        </Button>
      </div>
    </div>
  );
};
