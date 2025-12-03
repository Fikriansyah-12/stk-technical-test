"use client"

import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { PanelLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { open, openMobile } = useSidebar();
  const isMobile = useIsMobile();
  
  const showHeaderTrigger = isMobile ? !openMobile : !open;

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-card flex items-center px-4 sticky top-0 z-10">
          {showHeaderTrigger && (
            <SidebarTrigger className="hover:bg-muted p-2 rounded">
              <PanelLeft className="h-5 w-5" />
            </SidebarTrigger>
          )}
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
