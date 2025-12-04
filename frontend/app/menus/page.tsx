"use client";

import { useEffect, useState, type ReactNode } from "react";
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
import { useToast } from "@/hooks/useToast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
const Menus = () => {
  const {
    selectedMenu,
    setSelectedMenu,
    menuItems,
    expandAll,
    collapseAll,
    fetchTree,
    isLoading,
    error,
  } = useMenuStore();

  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeButton, setActiveButton] = useState<"expand" | "collapse">(
    "expand"
  );

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);
  useEffect(() => {
    if (!error) return;

    toast({
      variant: "destructive",
      title: "Error",
      description: error,
    });
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2 rounded-full">
              <LayoutGrid className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold">Menus</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-2 w-1/2">
            <Alert className="bg-red-500/30" variant="destructive">
              <AlertTitle className="">Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
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
                    <SelectValue placeholder="Select menu" />
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  Collapse All
                </Button>
              </div>

              <div className="max-h-[600px] overflow-y-auto pr-2">
                {isLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-full rounded" />
                    ))}
                  </div>
                ) : (
                  <MenuTree items={menuItems} />
                )}
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
  children: ReactNode;
  className?: string;
}) => <label className={className}>{children}</label>;

export default Menus;
