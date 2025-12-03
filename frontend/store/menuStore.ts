import { create } from "zustand";

export interface MenuItem {
  id: string;
  name: string;
  depth: number;
  parentData: string | null;
  children?: MenuItem[];
  expanded?: boolean;
}

interface MenuState {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  menuItems: MenuItem[];
  expandedItems: Set<string>;
  toggleExpand: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  selectedItem: MenuItem | null;
  selectItem: (item: MenuItem | null) => void;
}

const initialMenuData: MenuItem[] = [
  {
    id: "system-management",
    name: "system.management",
    depth: 0,
    parentData: null,
    expanded: true,
    children: [
      {
        id: "system-management-1",
        name: "System Management",
        depth: 1,
        parentData: "system.management",
        expanded: true,
        children: [
          {
            id: "systems",
            name: "Systems",
            depth: 2,
            parentData: "System Management",
            expanded: true,
            children: [
              {
                id: "system-code",
                name: "System Code",
                depth: 3,
                parentData: "Systems",
                children: [
                  {
                    id: "code-reg",
                    name: "Code Registration",
                    depth: 0,
                    parentData: "System Code",
                  },
                  {
                    id: "code-reg-2",
                    name: "Code Registration - 2",
                    depth: 0,
                    parentData: "System Code",
                  },
                ],
              },
              {
                id: "properties",
                name: "Properties",
                depth: 3,
                parentData: "Systems",
              },
              {
                id: "menus",
                name: "Menus",
                depth: 3,
                parentData: "Systems",
                children: [
                  {
                    id: "menu-reg",
                    name: "Menu Registration",
                    depth: 4,
                    parentData: "Menus",
                  },
                ],
              },
              {
                id: "api-list",
                name: "API List",
                depth: 3,
                parentData: "Systems",
                children: [
                  {
                    id: "api-reg",
                    name: "API Registration",
                    depth: 4,
                    parentData: "API List",
                  },
                  {
                    id: "api-edit",
                    name: "API Edit",
                    depth: 4,
                    parentData: "API List",
                  },
                ],
              },
            ],
          },
          {
            id: "users-groups",
            name: "Users & Groups",
            depth: 2,
            parentData: "System Management",
            children: [
              {
                id: "users",
                name: "Users",
                depth: 3,
                parentData: "Users & Groups",
                children: [
                  {
                    id: "user-reg",
                    name: "User Account Registration",
                    depth: 4,
                    parentData: "Users",
                  },
                ],
              },
              {
                id: "groups",
                name: "Groups",
                depth: 3,
                parentData: "Users & Groups",
                children: [
                  {
                    id: "group-reg",
                    name: "User Group Registration",
                    depth: 4,
                    parentData: "Groups",
                  },
                ],
              },
            ],
          },
          {
            id: "system-log",
            name: "시스템 슬럼",
            depth: 2,
            parentData: "System Management",
            children: [
              {
                id: "system-log-detail",
                name: "시스템 슬럼 상세",
                depth: 3,
                parentData: "시스템 슬럼",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const useMenuStore = create<MenuState>((set, get) => ({
  selectedMenu: "system management",
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
  menuItems: initialMenuData,
  expandedItems: new Set([
    "system-management",
    "system-management-1",
    "systems",
    "system-code",
  ]),
  toggleExpand: (id) =>
    set((state) => {
      const newExpanded = new Set(state.expandedItems);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return { expandedItems: newExpanded };
    }),
  expandAll: () => {
    const getAllIds = (items: MenuItem[]): string[] => {
      return items.reduce((acc: string[], item) => {
        acc.push(item.id);
        if (item.children) {
          acc.push(...getAllIds(item.children));
        }
        return acc;
      }, []);
    };
    const allIds = getAllIds(get().menuItems);
    set({ expandedItems: new Set(allIds) });
  },
  collapseAll: () => set({ expandedItems: new Set() }),
  selectedItem: null,
  selectItem: (item) => set({ selectedItem: item }),
}));
