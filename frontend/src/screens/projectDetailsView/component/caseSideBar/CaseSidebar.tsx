import { Separator } from "@/components/ui/separator";
import { QuickActions } from "./component/QuickActions";
import { Tools } from "./component/Tools";
import { CaseSummary } from "./component/CaseSummary";

export const CaseSidebar = ({projectId}:any) => {
  return (
    <div className="w-80 bg-background border-l border-border h-full p-4 space-y-6">
      <QuickActions projectId={projectId} />
      <Separator />
      <Tools />
      <Separator />
      <CaseSummary />
    </div>
  );
};
