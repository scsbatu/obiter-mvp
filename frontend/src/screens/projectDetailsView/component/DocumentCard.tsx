import { FileText, Download, Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  title: string;
  fileSize: string;
  uploadDate: string;
  pages?: number;
  tags: Array<{
    label: string;
    variant:
      | "expert"
      | "medical"
      | "settlement"
      | "plaintiff"
      | "defendant"
      | "default";
  }>;
  fileType?: string;
}

const getTagStyles = (variant: string) => {
  switch (variant) {
    case "expert":
      return "bg-status-expert/20 text-status-expert border-status-expert/30";
    case "medical":
      return "bg-status-medical/20 text-status-medical border-status-medical/30";
    case "settlement":
      return "bg-status-settlement/20 text-status-settlement border-status-settlement/30";
    case "plaintiff":
      return "bg-status-plaintiff/20 text-status-plaintiff border-status-plaintiff/30";
    case "defendant":
      return "bg-status-defendant/20 text-status-defendant border-status-defendant/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export const DocumentCard = ({
  title,
  fileSize,
  uploadDate,
  pages,
  tags,
  fileType = "pdf",
}: DocumentCardProps) => {
  return (
    <div className="bg-light-gold border border-border rounded-lg p-3 md:p-4 hover:bg-dark-surface-hover transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
          <div className="bg-light-gold/10 p-1.5 md:p-2 rounded-md shrink-0">
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-legal-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground text-xs md:text-sm leading-tight mb-1 truncate">
              {title}
            </h3>
            <div className="flex items-center space-x-1 md:space-x-2 text-xs text-muted-foreground">
              <span>{fileType.toUpperCase()}</span>
              <span>•</span>
              <span>{fileSize}</span>
              {pages && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{pages} pages</span>
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-muted-foreground hover:text-foreground shrink-0"
        >
          <MoreVertical className="h-3 w-3" />
        </Button>
      </div>
      <div className="text-xs text-muted-foreground mb-3">
        Uploaded: {uploadDate}
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="outline"
            className={cn("text-xs border", getTagStyles(tag.variant))}
          >
            {tag.label}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-1 md:px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Eye className="h-3 w-3 mr-0 md:mr-1" />
            <span className="hidden md:inline">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-1 md:px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Download className="h-3 w-3 mr-0 md:mr-1" />
            <span className="hidden md:inline">Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
