"use client";
import { LayoutGrid } from "lucide-react";
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
import { useState } from "react";

const Menus = () => {
  const { selectedMenu, setSelectedMenu, menuItems, expandAll, collapseAll } =
    useMenuStore();
  const isMobile = useIsMobile();
  const [activeButton, setActiveButton] = useState<"expand" | "collapse">(
    "expand"
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <span>Menu</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2 rounded-full">
            <LayoutGrid className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold">Menus</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div
          className={`grid gap-6 ${
            isMobile ? "grid-cols-1" : "lg:grid-cols-2"
          }`}
        >
          <div className="bg-card rounded-lg border">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Menu</Label>
                <Select value={selectedMenu} onValueChange={setSelectedMenu}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system management">
                      system management
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={activeButton === "expand" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    expandAll();
                    setActiveButton("expand");
                  }}
                  className="rounded-full"
                >
                  Expand All
                </Button>
                <Button
                  variant={activeButton === "collapse" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    collapseAll();
                    setActiveButton("collapse");
                  }}
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

const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <label className={className}>{children}</label>;

export default Menus;
