"use client";

import { useState } from "react";
import {
  LayoutGrid,
  FolderOpen,
  FolderClosed,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavLink } from "./Navlink";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface MenuGroup {
  title: string;
  icon: "folder";
  children: { title: string; url: string }[];
}

interface SingleItem {
  title: string;
  url: string;
  icon: "folder";
}

type MenuItem = MenuGroup | SingleItem;

const menuStructure: MenuItem[] = [
  {
    title: "Systems",
    icon: "folder",
    children: [
      { title: "System Code", url: "/system-code" },
      { title: "Properties", url: "/properties" },
      { title: "Menus", url: "/menus" },
      { title: "API List", url: "/api-list" },
    ],
  },
  { title: "Users & Group", url: "/users-group", icon: "folder" },
  { title: "Competition", url: "/competition", icon: "folder" },
];

function isMenuGroup(item: MenuItem): item is MenuGroup {
  return "children" in item;
}

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const currentPath = pathname;
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Systems"])
  );

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) newSet.delete(title);
      else newSet.add(title);
      return newSet;
    });
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center">
            <div className="w-10 h-10 gap-2 rounded flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo/logo-stk.svg"
                alt="STK Logo"
                width={35}
                height={35}
              />
            </div>
            {open && (
              <div className="text-white">
                <div className="text-[11px] opacity-80 font-medium tracking-wide leading-3">
                  Solusi
                </div>
                <div className="text-[11px] opacity-80 font-medium tracking-wide leading-3">
                  Teknologi
                </div>
                <div className="text-[11px] opacity-80 font-medium tracking-wide leading-3">
                  Kreatif
                </div>
              </div>
            )}
          </div>
          <SidebarTrigger className="text-white hover:bg-white/10 rounded p-1">
            {open ? (
              <Icon icon="mdi:menu-open" className="!h-6 !w-6" />
                   ) : (
                     <Icon icon="mdi:menu-close" className="h-6 w-6 text-black" />
            )}
          </SidebarTrigger>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 p-2">
              {menuStructure.map((item) => {
                if (isMenuGroup(item)) {
                  const isExpanded = expandedGroups.has(item.title);
                  return (
                    <div key={item.title}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => toggleGroup(item.title)}
                          className="transition-all hover:bg-white/10 text-sidebar-foreground hover:text-white cursor-pointer"
                        >
                          {isExpanded ? (
                            <FolderOpen className="h-4 w-4" />
                          ) : (
                            <FolderClosed className="h-4 w-4" />
                          )}
                          {open && <span>{item.title}</span>}
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {isExpanded && open && (
                        <div className="mt-1 ml-2 bg-white/10 rounded-lg p-1">
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton
                                asChild
                                className={cn(
                                  "transition-all hover:bg-white/20",
                                  isActive(child.url)
                                    ? "bg-white text-primary font-semibold rounded-full hover:bg-white"
                                    : "text-sidebar-foreground hover:text-white"
                                )}
                              >
                                <NavLink href={child.url}>
                                  <LayoutGrid className="h-4 w-4" />
                                  <span>{child.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-all hover:bg-white/10",
                        isActive(item.url)
                          ? "bg-white text-primary font-semibold rounded-full hover:bg-white"
                          : "text-sidebar-foreground hover:text-white"
                      )}
                    >
                      <NavLink href={item.url}>
                        <FolderClosed className="h-4 w-4" />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
