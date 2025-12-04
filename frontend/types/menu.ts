
export interface ApiMenuItem {
  id: string;
  title: string;
  order: number;
  parentId: string | null;
  children?: ApiMenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  order: number;
  parentId: string | null;
  parentData: string | null;
    depth?: number;
  expanded?: boolean;
  children?: MenuItem[];
}

export interface CreateMenuPayload {
  title: string;
  parentId?: string | null;
}

export interface UpdateMenuPayload {
  title?: string;
  parentId?: string | null;
}

export interface MoveMenuPayload {
  newParentId: string | null;
}

export interface ReorderMenuPayload {
  newOrder: number;
}
