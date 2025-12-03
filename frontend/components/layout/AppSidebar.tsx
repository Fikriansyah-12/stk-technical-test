"use client";

import { useState } from "react";
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
  icon: string;
  children: { title: string; url: string; icon:string }[];
}

interface SingleItem {
  title: string;
  url: string;
  icon: string;
}

type MenuItem = MenuGroup | SingleItem;

const menuStructure: MenuItem[] = [
  {
    title: "Systems",
    icon: "folder",
    children: [
      { title: "System Code", url: "/system-code", icon:"tabler:layout-2" },
      { title: "Properties", url: "/properties", icon:"basil:layout-outline" },
      { title: "Menus", url: "/menus", icon:"tabler:layout-2-filled" },
      { title: "API List", url: "/api-list", icon:"basil:layout-outline" },
    ],
  },
  { title: "Users & Group", url: "/users-group", icon: "material-symbols:folder-outline" },
  { title: "Competition", url: "/competition", icon: "material-symbols:folder-outline" },
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
      <SidebarContent>
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
              <Icon icon="mdi:menu-close" className="!h-6 !w-6 text-black" />
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
                    <div key={item.title} className="bg-white/10 p-1 rounded-lg gap-4">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => toggleGroup(item.title)}
                          className="transition-all hover:bg-white/10 text-sidebar-foreground hover:text-white cursor-pointer"
                        >
                          {isExpanded ? (
                            <Icon icon="material-symbols:folder" className="!h-5 !w-5" />
                          ) : (
                            <Icon
                              icon="material-symbols:folder-outline"
                              className="!h-5 !w-5"
                            />
                          )}
                          {open && <span>{item.title}</span>}
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {isExpanded && open && (
                        <div className=" rounded-lg">
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton
                                asChild
                                className={cn(
                                  "transition-all hover:bg-white/10",
                                  isActive(child.url)
                                    ? "bg-white text-primary text-blue-600 font-semibold rounded-full hover:bg-white/80 hover:text-blue-600"
                                    : "text-sidebar-foreground hover:text-white"
                                )}
                              >
                                <NavLink href={child.url}>
                                  <Icon icon={child.icon} className="!h-5 !w-5" />
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
                        <Icon icon={item.icon} className="!h-5 !w-5" />
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
