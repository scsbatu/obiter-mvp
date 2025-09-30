import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Plus, X, File, FileText, Image } from "lucide-react";

export interface Witness {
  id: string;
  name: string;
  role: string;
  description: string;
  additional: string[];
  type: "lay" | "expert";
}

const DocumentUploader = ({ uploadedFiles, setUploadedFiles, uploadFiles }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
      return <File className="w-5 h-5 text-gray-500" />
  };

  return (
    <div>
      <Card className="mb-8 bg-card_grey border-0">
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-legal-gold bg-legal-gold/5"
                : "border-border hover:border-legal-gold/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-legal-gold/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-legal-gold" />
              </div>
              <div className="text-white">
                Click to upload or drag & drop files
              </div>
              <Button
                variant="outline"
                className="border-legal-gold text-legal-gold hover:bg-legal-gold/10"
                onClick={handleFileSelect}
              >
                Browse Files
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              accept=".pdf"
            />
          </div>
          {uploadedFiles?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Uploaded Files ({uploadedFiles.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-light-white border border-border rounded-lg hover:bg-card/10 transition-colors"
                  >
                    <div className="flex-shrink-0">{getFileIcon(file)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                         {file?.name || file?.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                       {new Date(
                          file?.uploadedDate || new Date()
                        ).toDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={!file?.name}
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 p-1 h-auto flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <div className="flex item-center justify-center">
          <Button
            variant="outline"
            className="border-legal-gold text-legal-gold bg-card/50"
            onClick={uploadFiles}
          >
            Upload Files
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DocumentUploader;
