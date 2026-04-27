import { cn } from "@/utils/cn";
import { useVirtualizer } from "@tanstack/react-virtual";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface VirtualListProps<T> {
  className?: string;
  items: T[];
  estimatedItemSize?: number;
  initialIndexRender?: number;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  children: (item: T, index: number) => React.ReactNode;
}

export interface VirtualListActions {
  scrollToIndex: (index: number) => void;
}

function VirtualListInner<T>(
  {
    items: itemsProp,
    className,
    estimatedItemSize = 275,
    initialIndexRender = 0,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    children,
  }: VirtualListProps<T>,
  ref: React.ForwardedRef<VirtualListActions>
) {
  "use no memo";
  const parentRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: hasNextPage ? itemsProp.length + 1 : itemsProp.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemSize,
    initialOffset: initialIndexRender * estimatedItemSize,
  });

  const items = virtualizer.getVirtualItems();
  const lastVirtualItemIndex = items[items.length - 1]?.index;

  useEffect(() => {
    if (lastVirtualItemIndex === undefined || fetchNextPage === undefined) {
      return;
    }

    if (
      lastVirtualItemIndex >= itemsProp.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    itemsProp.length,
    isFetchingNextPage,
    lastVirtualItemIndex,
  ]);

  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: (index: number) => {
        virtualizer.scrollToIndex(index);
      },
    }),
    [virtualizer]
  );

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
          className="absolute top-0 left-0 w-full"
          style={{ transform: `translateY(${items[0]?.start ?? 0}px)` }}
        >
          {items.map((item) => (
            <div
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
            >
              {children(itemsProp[item.index], item.index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VirtualList = forwardRef(VirtualListInner) as <T>(
  props: VirtualListProps<T> & React.RefAttributes<VirtualListActions>
) => React.ReactElement;

export default VirtualList;
