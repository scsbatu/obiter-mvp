import { Upload, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DocumentUploadModal from "@/components/DocumentUploadModal";
import { useUploadFiles } from "@/api/project";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export const QuickActions = ({ projectId, uploadDocumentFile,uploadedFiles,setUploadedFiles }: any) => {
  const navigate = useNavigate();
  const [uploadDocumentStatus, setUploadDocumentStatus] = useState(false);
  const { toast } = useToast();

  const uploadFiles = () => {
    uploadDocumentFile(
      { files: uploadedFiles, projectId: projectId },
      {
        onSuccess: () => {
          toast({
            description: "The project file has been uploaded",
            variant: "default",
          });
          navigate(`/projects/project-view/${projectId}`);
          setUploadDocumentStatus(false);
        },
        onError: () => {
          toast({
            description: "The project file has not been uploaded",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-primary mb-3">Quick Actions</h3>
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start h-8 text-xs mb-2"
          onClick={() => setUploadDocumentStatus(true)}
        >
          <Upload className="h-3 w-3 mr-2" />
          Upload Document
        </Button>
        <Card className="bg-card_grey p-1">
          <CardHeader className="text-md text-white mb-0 pb-1">Witness Evidence Analyser</CardHeader>
          <CardContent>
            <p className="text-sm py-4">Comprehensive credibility assessment and cross-examination preparation</p>
            <Button
              variant="outline"
              className="w-full justify-start h-8 text-xs mt-3"
              onClick={() =>
                navigate(`/projects/project-analyses-view/${projectId}`)
              }
            >
              <FileText className="h-3 w-3 mr-2" />
              Analyse Selected
            </Button>
          </CardContent>
        </Card>
        <DocumentUploadModal
          open={uploadDocumentStatus}
          onClose={() => setUploadDocumentStatus(false)}
          title="Upload Document"
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          uploadFiles={uploadFiles}
        />
      </div>
    </div>
  );
};
