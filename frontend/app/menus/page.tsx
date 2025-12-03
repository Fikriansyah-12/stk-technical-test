"use client"
import { LayoutGrid, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuTree } from "@/components/menu/menuTree";
import { MenuForm } from "@/components/menu/menuForm";
import { useMenuStore } from "@/store/menuStore";

const Menus = () => {
  const { selectedMenu, setSelectedMenu, menuItems, expandAll, collapseAll } = useMenuStore();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <span>Menu</span>
          </div>
          <div className="flex items-center gap-3">
            <LayoutGrid className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold">Menus</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
          <div className="bg-card rounded-lg border">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Menu</Label>
                <Select value={selectedMenu} onValueChange={setSelectedMenu}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system management">system management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={expandAll}
                  className="rounded-full"
                >
                  Expand All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={collapseAll}
                  className="rounded-full"
                >
                  Collapse All
                </Button>
              </div>

              <div className="max-h-[600px] overflow-y-auto pr-2">
                <MenuTree items={menuItems} />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border">
            <MenuForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default Menus;
