import { ChevronRight, ChevronDown, PlusIcon } from "lucide-react";
import { MenuItem, useMenuStore } from "@/store/menuStore";
import { cn } from "@/lib/utils";

interface MenuTreeProps {
  items: MenuItem[];
  level?: number;
}

export function MenuTree({ items, level = 0 }: MenuTreeProps) {
  const { expandedItems, toggleExpand, selectedItem, selectItem } = useMenuStore();

  const renderItem = (item: MenuItem, depth: number, isLast: boolean = false) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isSelected = selectedItem?.id === item.id;

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
              width: '16px'
            }}
          />
        )}

        <div
          className={cn(
            "flex items-center gap-1 py-1.5 px-2 hover:bg-muted/50 cursor-pointer rounded transition-colors relative z-10",
            isSelected && "bg-muted"
          )}
          style={{ paddingLeft: `${depth * 24 + 8}px` }}
          onClick={() => selectItem(item)}
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
            {item.id === 'system-code' && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full flex-shrink-0">
                <PlusIcon className="w-4 h-4"/>
              </span>
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="relative">
            {item.children!.map((child, index) => 
              renderItem(child, depth + 1, index === item.children!.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => renderItem(item, level, index === items.length - 1))}
    </div>
  );
}
