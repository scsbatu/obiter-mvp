import { LegalSidebar } from "./LegalSidebar";
import { DocumentGrid } from "./DocumentGrid";
import { CaseSidebar } from "./caseSideBar/CaseSidebar";
import { Scale, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const LegalDashboard = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-sidebar-bg border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setLeftSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Scale className="h-5 w-5 md:h-6 md:w-6 text-legal-gold" />
              <span className="text-base md:text-lg font-semibold text-foreground">
                LegalDocs
              </span>
            </div>
            <div className="hidden sm:block text-xs md:text-sm text-muted-foreground">
              / Projects / Thompson v Metropolitan Shopping Centers
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-xs md:text-sm text-legal-gold">Active</span>
            <div className="hidden sm:block text-xs md:text-sm text-muted-foreground">
              Case No: CC-2024-13647
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
          <span className="text-foreground font-medium">
            Thompson v Metropolitan Shopping Centers Pty Ltd
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-muted-foreground">
            <span>📄 43 documents</span>
            <span>⚖️ Ready for analysis</span>
            <span className="hidden lg:inline">
              📋 18 Motions to March 2025
            </span>
            <span className="hidden xl:inline">
              📑 Premises Liability • County Court Victoria
            </span>
          </div>
        </div>
      </header>
      <div className="flex">
        {leftSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setLeftSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-80 max-w-[80vw]">
              <div className="flex items-center justify-between p-4 bg-sidebar-bg border-b">
                <span className="font-semibold text-foreground">
                  Navigation
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLeftSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <LegalSidebar />
            </div>
          </div>
        )}
        <div className="hidden md:block">
          <LegalSidebar />
        </div>
        <div className="flex-1">
          <DocumentGrid />
        </div>
        {rightSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setRightSidebarOpen(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 max-w-[80vw]">
              <div className="flex items-center justify-between p-4 bg-sidebar-bg border-b">
                <span className="font-semibold text-foreground">
                  Case Details
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRightSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <CaseSidebar />
            </div>
          </div>
        )}
        <div className="hidden lg:block">
          <CaseSidebar />
        </div>
      </div>
    </div>
  );
};
