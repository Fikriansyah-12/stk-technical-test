"use client";

import { useState, useEffect } from "react";
import { useMenuStore } from "@/store/menuStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function MenuForm() {
  const { selectedItem, updateItem, deleteItem } = useMenuStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.name);
    } else {
      setTitle("");
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a menu item to view details
      </div>
    );
  }

  const handleSave = async () => {
    if (!title.trim()) return;
    await updateItem(selectedItem.id, { title });
  };

  const handleDelete = async () => {
    if (!confirm("Delete this menu and all its children?")) return;
    await deleteItem(selectedItem.id);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Menu ID</Label>
        <Input
          value={selectedItem.id}
          readOnly
          className="bg-muted/50 border-0 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Name</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-input text-sm"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          className="w-full rounded-full bg-blue-700 h-11"
          type="button"
          onClick={handleSave}
          disabled={!title.trim()}
        >
          Save
        </Button>

        <Button
          type="button"
          variant="outline"
          className="rounded-full h-11"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
