import { User, FileText, BarChart3, Calculator } from "lucide-react";

const tools = [
  { icon: User, label: "Witness Locator Analyser" },
  { icon: FileText, label: "Document Analyser" },
  { icon: BarChart3, label: "Timeline Builder" },
  { icon: Calculator, label: "Cross Examination Prep" },
];

export const Tools = () => {
  return (
    <div>
      <h3 className="text-sm font-medium text-primary mb-3">Tools</h3>
      <div className="space-y-2">
        {tools.map(({ icon: Icon, label }, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <Icon className="h-3 w-3" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
