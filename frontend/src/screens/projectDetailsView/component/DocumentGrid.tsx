import { DocumentCard } from "./DocumentCard";
import { useState } from "react";
import { Search, Filter, MoreVertical, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sampleDocuments } from "@/config/constants";

export const DocumentGrid = ({ documentSummery, currentDocument }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = sampleDocuments.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex-1 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-primary">
            Case Documents
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {documentSummery?.total} documents • Ready for analysis
          </p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div> */}
      </div>
      {currentDocument && currentDocument.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="relative flex-1 sm:max-w-md" />
            <div className="flex items-center space-x-1 self-end sm:self-auto">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className={`grid gap-3 md:gap-4 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {currentDocument.map((doc, index) => (
              <DocumentCard
                key={index}
                title={doc.fileName}
                uploadDate={doc?.uploadedDate}
                pages={doc?.noOfPages}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-muted-foreground text-lg py-4">
          Documents are unavailable
        </div>
      )}
    </div>
  );
};
