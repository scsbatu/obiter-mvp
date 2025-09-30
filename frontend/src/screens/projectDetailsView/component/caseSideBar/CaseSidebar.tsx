import { Separator } from "@/components/ui/separator";
import { QuickActions } from "./component/QuickActions";
import { Tools } from "./component/Tools";
import { CaseSummary } from "./component/CaseSummary";

export const CaseSidebar = ({projectId,uploadDocumentFile,uploadedFiles,setUploadedFiles}:any) => {
  return (
    <div className="w-80 bg-background border-l border-border h-full p-4 space-y-6">
      <QuickActions projectId={projectId} uploadDocumentFile={uploadDocumentFile}  uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
      <Separator />
      <Separator />
      <CaseSummary />
    </div>
  );
};
