"use client";

import { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { PanelLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Icon } from "@iconify/react";

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
        <header className="h-14 bg-card flex items-center px-4 sticky top-0 z-10">
          {showHeaderTrigger && (
            <SidebarTrigger className="hover:bg-muted p-2 rounded">
              <PanelLeft className="h-5 w-5" />
            </SidebarTrigger>
          )}
          <div className="flex items-center p-3 gap-2 text-sm">
            <Icon icon="material-symbols:folder" className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">/ Menus</span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
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
