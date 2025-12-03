"use client"
import { useMenuStore } from "@/store/menuStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function MenuForm() {
  const { selectedItem } = useMenuStore();

  if (!selectedItem) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a menu item to view details
      </div>
    );
  }

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
        <Label className="text-sm text-muted-foreground">Depth</Label>
        <Input 
          value={selectedItem.depth} 
          readOnly 
          className="bg-muted/50 border-0 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Parent Data</Label>
        <Input 
          value={selectedItem.parentData || '-'} 
          readOnly 
          className="bg-muted/50 border-0 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Name</Label>
        <Input 
          value={selectedItem.name} 
          className="border-input text-sm"
        />
      </div>

      <Button className="w-full rounded-full bg-blue-700 h-11">
        Save
      </Button>
    </div>
  );
}
