"use client";

import {
  LayoutGrid,
  Code,
  FileText,
  Menu,
  List,
  FolderOpen,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./Navlink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

const items = [
  { title: "Systems", url: "/", icon: LayoutGrid },
  { title: "System Code", url: "/system-code", icon: Code },
  { title: "Properties", url: "/properties", icon: FileText },
  { title: "Menus", url: "/menus", icon: Menu },
  { title: "API List", url: "/api-list", icon: List },
  { title: "Users & Group", url: "/users-group", icon: Users },
  { title: "Competition", url: "/competition", icon: FolderOpen },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r-0">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
            <div className="text-white font-bold text-base">
              <Image
                src="/logo/logo-stk.svg"
                alt="STK Logo"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          </div>
          {open && (
            <div className="text-white">
              <div className="text-[10px] opacity-80 font-medium tracking-wide">
                SYSTEM
              </div>
              <div className="text-xs font-semibold">MANAGEMENT</div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 p-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-all hover:bg-white/10 text-sidebar-foreground hover:text-white"
                    )}
                  >
                    <NavLink
                      href={item.url}
                      exact={item.url === "/"}
                      className="flex items-center gap-2 rounded-full px-3 py-2"
                      activeClassName="bg-white text-primary font-semibold hover:bg-white"
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
