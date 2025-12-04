"use client";

import { useState, type MouseEvent, type DragEvent } from "react";
import { ChevronRight, ChevronDown, PlusIcon } from "lucide-react";
import { useMenuStore } from "@/store/menuStore";
import type { MenuItem } from "@/types/menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MenuTreeProps {
  items: MenuItem[];
  level?: number;
}

export function MenuTree({ items, level = 0 }: MenuTreeProps) {
  const {
    expandedItems,
    toggleExpand,
    selectedItem,
    selectItem,
    createItem,
    moveItem,
    reorderItem,
    menuItems,
  } = useMenuStore();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [parentForCreate, setParentForCreate] = useState<MenuItem | null>(null);
  const [newName, setNewName] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const openCreateModal = (
    e: MouseEvent<HTMLButtonElement>,
    parent: MenuItem
  ) => {
    e.stopPropagation();
    setParentForCreate(parent);
    setNewName("");
    setIsCreateOpen(true);
  };

  const handleConfirmCreate = async () => {
    if (!parentForCreate) return;
    if (!newName.trim()) return;

    await createItem({
      title: newName.trim(),
      parentId: parentForCreate.id,
    });

    setIsCreateOpen(false);
  };

  const findItemAndSiblings = (
    nodes: MenuItem[],
    id: string,
    parent: MenuItem | null = null
  ): { item: MenuItem; siblings: MenuItem[]; parent: MenuItem | null } | null => {
    for (const node of nodes) {
      if (node.id === id) {
        return {
          item: node,
          siblings: parent?.children ?? nodes,
          parent,
        };
      }
      if (node.children?.length) {
        const found = findItemAndSiblings(node.children, id, node);
        if (found) return found;
      }
    }
    return null;
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    item: MenuItem
  ) => {
    e.stopPropagation();
    setDraggedId(item.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
  };

  const handleDragOver = (
    e: DragEvent<HTMLDivElement>,
    item: MenuItem
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedId || draggedId === item.id) return;
    setDragOverId(item.id);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = (
    e: DragEvent<HTMLDivElement>,
    item: MenuItem
  ) => {
    e.stopPropagation();
    if (dragOverId === item.id) {
      setDragOverId(null);
    }
  };

  const handleDrop = async (
    e: DragEvent<HTMLDivElement>,
    target: MenuItem
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedId || draggedId === target.id) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const draggedInfo = findItemAndSiblings(menuItems, draggedId);
    const targetInfo = findItemAndSiblings(menuItems, target.id);

    if (!draggedInfo || !targetInfo) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const dragged = draggedInfo.item;
    const sameParent = dragged.parentId === target.parentId;

    try {
      if (sameParent) {
        await reorderItem(dragged.id, {
          newOrder: target.order,
        });
      } else {
        await moveItem(dragged.id, {
          newParentId: target.id,
        });
      }
    } finally {
      setDraggedId(null);
      setDragOverId(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const renderItem = (item: MenuItem, depth: number) => {
    const children = item.children ?? [];
    const hasChildren = children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isSelected = selectedItem?.id === item.id;
    const isDragging = draggedId === item.id;
    const isDragOver = dragOverId === item.id;

    return (
      <div key={item.id} className="select-none relative">
        {depth > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-border"
            style={{ left: `${(depth - 1) * 24 + 8}px` }}
          />
        )}

        {depth > 0 && (
          <div
            className="absolute top-[18px] h-px bg-border"
            style={{
              left: `${(depth - 1) * 24 + 8}px`,
              width: "16px",
            }}
          />
        )}

        <div
          className={cn(
            "flex items-center gap-1 py-1.5 px-2 hover:bg-muted/50 cursor-pointer rounded transition-colors relative z-10",
            isSelected && "bg-muted",
            isDragging && "opacity-50",
            isDragOver && "ring-2 ring-primary/40"
          )}
          style={{ paddingLeft: `${depth * 24 + 8}px` }}
          onClick={() => selectItem(item)}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={(e) => handleDragOver(e, item)}
          onDragLeave={(e) => handleDragLeave(e, item)}
          onDrop={(e) => handleDrop(e, item)}
          onDragEnd={handleDragEnd}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggleExpand(item.id);
            }}
            className="p-0.5 hover:bg-muted rounded flex-shrink-0"
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              )
            ) : (
              <div className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm truncate">{item.name}</span>

            <button
              type="button"
              onClick={(e) => openCreateModal(e, item)}
              className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center"
            >
              <PlusIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="relative">
            {children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-0">
        {items.map((item) => renderItem(item, level))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Menu</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Parent</Label>
              <Input
                value={parentForCreate?.name ?? "-"}
                readOnly
                className="bg-muted/50 border-0 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Menu name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New menu name"
                className="text-sm"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmCreate}
              className="rounded-full bg-blue-700"
              disabled={!newName.trim()}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}
