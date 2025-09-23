import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3 } from "lucide-react";

interface ProjectCardProps {
  title: string;
  status: string;
  documents: number;
  analyses: number;
  onOpen?: () => void;
}

export function ProjectCard({
  title,
  status,
  documents,
  analyses,
  onOpen,
}: ProjectCardProps) {
  return (
    <Card className="bg-card/5 border-border hover:bg-card/10 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 leading-tight">
              {title}
            </h3>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-500/20 text-green-400 border-green-500/30 ml-2"
          >
            {status}
          </Badge>
        </div>
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-light-gold" />
            <span className="text-sm text-white">
              {documents} {documents === 1 ? "document" : "documents"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-light-gold" />
            <span className="text-sm text-white">
              {analyses} {analyses === 1 ? "analysis" : "analyses"}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          onClick={onOpen}
        >
          Open Project
        </Button>
      </CardContent>
    </Card>
  );
}
