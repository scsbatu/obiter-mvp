import { FileText, Download, Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/file";

interface DocumentDetails {
  title: string;
  fileSize?: string;
  uploadedDate?: string;
  noOfPages?: number;
  subTitle?: string;
  fileType?: string;
}
interface DocumentCardProps {
  key: any;
  documentDetails: DocumentDetails;
  enableSummery: any;
}

export const DocumentCard = ({
  documentDetails,
  enableSummery,
}: DocumentCardProps) => {
  return (
    <div className="bg-card_grey border border-border rounded-lg p-3 md:p-4 hover:bg-dark-surface-hover transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex space-x-2 md:space-x-3 min-w-0 flex-1">
          <div className="bg-light-gold/10 p-1.5 md:p-2 rounded-md shrink-0">
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-legal-gold" />
          </div>
          <div className="flex-1 flex-row min-w-0">
            <div className="flex-row">
              <h3 className="font-medium text-primary text-md  leading-tight mb-1 truncate">
                {documentDetails?.title}
              </h3>
              <h3 className="font-medium text-white text-sm leading-tight mb-1 mt-3">
                {documentDetails?.subTitle}
              </h3>
              <div className="flex items-center space-x-1 md:space-x-2 text-xs text-muted-foreground my-3">
                <span>PDF</span>{" "}
                <span>{formatFileSize(documentDetails?.fileSize)}</span>
                {documentDetails?.noOfPages && (
                  <>
                    <span className="hidden sm:inline">
                      {documentDetails?.noOfPages} pages
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex-col">
              <div className="text-xs text-muted-foreground my-3">
                Uploaded:{" "}
                {new Date(
                  documentDetails?.uploadedDate || new Date()
                ).toDateString()}
              </div>
              <div className="flex flex-wrap gap-1 mb-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 py-0"
                  onClick={() => enableSummery(documentDetails)}
                >
                  Overview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-1 md:px-2 text-xs text-muted-black hover:text-black"
          >
            <Eye className="h-3 w-3 mr-0 md:mr-1" />
            <span className="hidden md:inline hover:text-black">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-1 md:px-2 text-xs text-muted-black hover:text-black"
          >
            <Download className="h-3 w-3 mr-0 md:mr-1" />
            <span className="hidden md:inline hover:text-black">Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
