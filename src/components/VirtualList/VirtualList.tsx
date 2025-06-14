import { cn } from "@/utils/cn";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface VirtualListProps<T> {
  data: T[];
  className?: string;
  estimatedItemSize?: number;
  itemRenderer: (item: T, index: number) => React.ReactNode;
}

export default function VirtualList<T>({
  data,
  className,
  estimatedItemSize = 275,
  itemRenderer,
}: VirtualListProps<T>) {
  "use no memo";
  const parentRef = useRef<HTMLDivElement>(null);

  const count = data.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemSize,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className={cn("overflow-y-auto contain-strict", className)}
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        <div
          className="absolute left-0 top-0 w-full"
          style={{ transform: `translateY(${items[0]?.start ?? 0}px)` }}
        >
          {items.map((item) => (
            <div
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
            >
              {itemRenderer(data[item.index], item.index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
