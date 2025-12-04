'use client';

import { create } from 'zustand';
import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
} from '@/lib/api';
import type {
  ApiMenuItem,
  MenuItem,
  CreateMenuPayload,
  UpdateMenuPayload,
  MoveMenuPayload,
  ReorderMenuPayload,
} from '@/types/menu';

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

  isLoading: boolean;
  error: string | null;

  fetchTree: () => Promise<void>;
  createItem: (payload: CreateMenuPayload) => Promise<void>;
  updateItem: (id: string, payload: UpdateMenuPayload) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  moveItem: (id: string, payload: MoveMenuPayload) => Promise<void>;
  reorderItem: (id: string, payload: ReorderMenuPayload) => Promise<void>;
}

const mapApiToMenuItem = (
  node: ApiMenuItem,
  parentName: string | null = null,
  depth = 1
): MenuItem => ({
  id: node.id,
  name: node.title,
  order: node.order,
  parentId: node.parentId,
  parentData: parentName,
  depth,
  expanded: true,
  children: node.children?.map((child) =>
    mapApiToMenuItem(child, node.title, depth + 1)
  ),
});

const collectAllIds = (items: MenuItem[]): string[] =>
  items.reduce<string[]>((acc, item) => {
    acc.push(item.id);
    if (item.children) acc.push(...collectAllIds(item.children));
    return acc;
  }, []);


export const useMenuStore = create<MenuState>((set, get) => ({
  selectedMenu: 'system management',
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),

  menuItems: [],
  expandedItems: new Set(),
  selectedItem: null,

  isLoading: false,
  error: null,

  toggleExpand: (id) =>
    set((state) => {
      const expanded = new Set(state.expandedItems);
      if (expanded.has(id)) expanded.delete(id);
      else expanded.add(id);
      return { expandedItems: expanded };
    }),

  expandAll: () => {
    const allIds = collectAllIds(get().menuItems);
    set({ expandedItems: new Set(allIds) });
  },

  collapseAll: () => set({ expandedItems: new Set() }),

  selectItem: (item) => set({ selectedItem: item }),


  async fetchTree() {
  try {
    set({ isLoading: true, error: null });
    const data = await apiGet<ApiMenuItem[]>('/api/menus');

    const mapped = data.map((root) => mapApiToMenuItem(root, null, 1));
    const allIds = collectAllIds(mapped);

    set({
      menuItems: mapped,
      expandedItems: new Set(allIds),
      isLoading: false,
    });
  } catch (err: any) {
    set({
      error: err?.message ?? 'Failed to fetch menus',
      isLoading: false,
    });
  }
},


  async createItem(payload) {
    try {
      set({ isLoading: true, error: null });
      await apiPost('/api/menus', {
        title: payload.title,
        parentId: payload.parentId ?? null,
      });
      await get().fetchTree();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Failed to create menu',
        isLoading: false,
      });
    }
  },

  async updateItem(id, payload) {
    try {
      set({ isLoading: true, error: null });
      await apiPut(`/api/menus/${id}`, {
        title: payload.title,
        parentId: payload.parentId ?? null,
      });            
      await get().fetchTree();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Failed to update menu',
        isLoading: false,
      });
    }
  },

  async deleteItem(id) {
    try {
      set({ isLoading: true, error: null });
      await apiDelete(`/api/menus/${id}`);
      await get().fetchTree();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Failed to delete menu',
        isLoading: false,
      });
    }
  },

  async moveItem(id, payload) {
    try {
      set({ isLoading: true, error: null });
      await apiPatch(`/api/menus/${id}/move`, {
        newParentId: payload.newParentId,
      });
      await get().fetchTree();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Failed to move menu',
        isLoading: false,
      });
    }
  },

  async reorderItem(id, payload) {
    try {
      set({ isLoading: true, error: null });
      await apiPatch(`/api/menus/${id}/reorder`, {
        newOrder: payload.newOrder,
      });
      await get().fetchTree();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Failed to reorder menu',
        isLoading: false,
      });
    }
  },
}));
