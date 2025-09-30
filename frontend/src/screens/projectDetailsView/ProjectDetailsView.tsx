import { useEffect, useState } from "react";
import { LegalSidebar } from "./component/LegalSidebar";
import { DocumentGrid } from "./component/DocumentGrid";
import { CaseSidebar } from "./component/caseSideBar/CaseSidebar";
import { Scale, Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectById, useUploadFiles } from "@/api/project";
import { formatDate } from "@/utils/date";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";

export const ProjectDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { data, isFetching, isLoading, refetch } = useGetProjectById(id);
  const documentSummery = data?.documentsSummary || {};
  const witnesses = data?.witnesses || [];
  const totalDocument = documentSummery?.total || 0;
  const projectDate = formatDate(data?.incidentDate);

  const { mutate: uploadDocumentFile, isPending: uploadPending } =
    useUploadFiles();

  const uploadFileDocument = (details) => {
    uploadDocumentFile(
      { files:details.files, projectId:details.projectId },
      {
        onSuccess(data, variables, context) {
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    setUploadedFiles(data?.files || []);
  }, [data, uploadPending]);

  if (isLoading || isFetching || uploadPending) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="bg-sidebar-bg container mx-auto border-b border-border px-4 md:px-6 pt-0 pb-4">
        <div className="flex justify-end mb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1 text-primary"
            onClick={() => navigate(`/projects/edit-project/${id}`)}
          >
            <Settings className="h-4 w-4" />
            <span>Project Settings</span>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="block md:hidden"
            onClick={() => setLeftSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-5 w-5 md:h-6 md:w-6 text-legal-gold" />
              <span className="text-base md:text-lg font-semibold text-primary">
                LegalDocs
              </span>
            </div>
            <div className="hidden sm:block text-xs md:text-sm text-muted-foreground">
              / Projects / {data?.name}
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-400 border-green-500/30 ml-2"
            >
              {data?.status || "In progress"}
            </Badge>
            <div className="hidden sm:block text-xs md:text-sm text-muted-foreground">
              Case No: {data?.caseNo}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setRightSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm">
          <span className="text-white font-medium">{data?.name}</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-muted-foreground">
            <span>📄 {totalDocument} documents</span>
            <span className="lg:inline">📋 {projectDate}</span>
          </div>
        </div>
      </header>

      <div className="flex container mx-auto">
        {leftSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setLeftSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-80 max-w-[80vw]">
              <div className="flex items-center justify-between p-4 bg-sidebar-bg border-b">
                <span className="font-semibold text-white">Navigation</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLeftSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <LegalSidebar
                documentSummery={documentSummery}
                witnesses={witnesses}
              />
            </div>
          </div>
        )}
        <div className="hidden md:block">
          <LegalSidebar
            documentSummery={documentSummery}
            witnesses={witnesses}
          />
        </div>
        <div className="flex-1">
          <DocumentGrid documentSummery={documentSummery} />
        </div>
        {rightSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setRightSidebarOpen(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 max-w-[80vw]">
              <div className="flex items-center justify-between p-4 bg-sidebar-bg border-b">
                <span className="font-semibold text-white">Case Details</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRightSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <CaseSidebar
                projectId={id}
                uploadDocumentFile={(details) =>
                  uploadFileDocument(details)
                }
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
            </div>
          </div>
        )}
        <div className="hidden lg:block">
          <CaseSidebar
            projectId={id}
            uploadDocumentFile={(details) =>
              uploadFileDocument(details)
            }
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </div>
      </div>
    </div>
  );
};
