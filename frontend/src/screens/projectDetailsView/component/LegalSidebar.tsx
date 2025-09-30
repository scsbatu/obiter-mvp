import { useState } from "react";
import {
  Eye,
  Handshake,
  Folder,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count?: number;
  isActive?: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
}

const SidebarItem = ({
  icon: Icon,
  label,
  count,
  isActive,
  hasSubmenu,
  children,
}: SidebarItemProps) => {
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div className="mb-1">
      <div
        className={cn(
          "flex items-center justify-between py-2 text-sm rounded-md cursor-pointer transition-colors",
          isActive
            ? "bg-legal-gold text-background font-medium"
            : "text-white hover:bg-sidebar-item-hover"
        )}
        onClick={() => hasSubmenu && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {count}
          {hasSubmenu &&
            (isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            ))}
        </div>
      </div>
      {hasSubmenu && isExpanded && children && (
        <div className="ml-6 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

export const LegalSidebar = ({ documentSummery, witnesses }: any) => {
  return (
    <div className="w-64 bg-sidebar-bg border-r border-border h-full p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary mb-2">
          Document Categories
        </h2>
      </div>

      <div className="space-y-0">
        <SidebarItem
          icon={Folder}
          label="All Documents"
          count={documentSummery?.total || 0}
        />
        <SidebarItem
          icon={Folder}
          label="Pleadings"
          count={documentSummery?.pending || 0}
        />
        <SidebarItem
          icon={Folder}
          label="Expert Reports"
          count={documentSummery?.expertReports || 0}
        />
        <SidebarItem
          icon={Folder}
          label="Case Overview"
          count={documentSummery?.caseOverview || 0}
        />
        <SidebarItem
          icon={Folder}
          label="Settlements"
          count={documentSummery?.settlement || 0}
        />
      </div>
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-primary mb-3">
          Identified Witnesses
        </h3>
        <div className="space-y-2">
          {witnesses.length > 0 ? (
            witnesses.map((witness, index) => (
              <div
                key={index}
                className="text-sm text-white hover:text-legal-gold cursor-pointer transition-colors"
              >
                {witness}
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground italic">
              Witnesses not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
