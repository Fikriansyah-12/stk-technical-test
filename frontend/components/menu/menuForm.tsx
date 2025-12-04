"use client";

import { useState, useEffect } from "react";
import { useMenuStore } from "@/store/menuStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Save, Trash } from "lucide-react";

export function MenuForm() {
  const { selectedItem, updateItem, deleteItem } = useMenuStore();
  const [title, setTitle] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
  await updateItem(selectedItem.id, { 
    title,
    parentId: selectedItem.parentId ?? null,
  });
};

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;
    await deleteItem(selectedItem.id);
    setIsDeleteOpen(false);
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
          <Save className="w-10 h-10"/>
          Save
        </Button>

        <Button
          type="button"
          variant="outline"
          className="rounded-full bg-red-500 text-white hover:bg-red-600 h-11"
          onClick={handleDeleteClick}
        >
          <Trash className="w-10 h-10"/>
        Delete
        </Button>
      </div>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete this menu?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Menu{" "}
              <span className="font-semibold">
                {selectedItem.name}
              </span>{" "}
              akan dihapus, Jika menu ini punya child, mereka juga akan
              ikut terhapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
