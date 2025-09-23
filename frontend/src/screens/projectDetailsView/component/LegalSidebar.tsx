import { useState } from "react";
import {
  FileText,
  ClipboardList,
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
          "flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
          isActive
            ? "bg-legal-gold text-background font-medium"
            : "text-foreground hover:bg-sidebar-item-hover"
        )}
        onClick={() => hasSubmenu && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {count && (
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                isActive
                  ? "bg-background text-legal-gold"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {count}
            </span>
          )}
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

export const LegalSidebar = () => {
  return (
    <div className="w-64 bg-sidebar-bg border-r border-border h-full p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Document Categories
        </h2>
      </div>

      <div className="space-y-1">
        <SidebarItem icon={Folder} label="All Documents" count={43} />
        <SidebarItem
          icon={FileText}
          label="Pleadings"
          count={12}
          hasSubmenu={true}
        >
          <SidebarItem icon={FileText} label="Statements of Claim" count={3} />
          <SidebarItem icon={FileText} label="Defence Documents" count={4} />
          <SidebarItem icon={FileText} label="Counterclaims" count={2} />
        </SidebarItem>
        <SidebarItem
          icon={ClipboardList}
          label="Expert Reports"
          count={6}
          hasSubmenu={true}
        >
          <SidebarItem icon={ClipboardList} label="Medical Reports" count={3} />
          <SidebarItem
            icon={ClipboardList}
            label="Technical Reports"
            count={2}
          />
          <SidebarItem
            icon={ClipboardList}
            label="Financial Reports"
            count={1}
          />
        </SidebarItem>
        <SidebarItem icon={Eye} label="Case Overview" count={1} />
        <SidebarItem icon={Handshake} label="Settlements" count={3} />
      </div>
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Identified Witnesses
        </h3>
        <div className="space-y-2">
          {[
            "Sean Thompson",
            "Michelle Chen",
            "James Wilson",
            "Margaret Davis",
            "Dr Jennifer Walsh",
            "Dr Michael Roberts",
            "Susan Mitchell CPA",
            "Dr Andrea Mitchell",
          ].map((witness, index) => (
            <div
              key={index}
              className="text-sm text-foreground hover:text-legal-gold cursor-pointer transition-colors"
            >
              {witness}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
