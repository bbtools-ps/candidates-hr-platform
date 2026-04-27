import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VirtualList from "./VirtualList";

let virtualItems: Array<{ index: number; key: string; start: number }> = [];

const virtualizerMock = {
  getVirtualItems: () => virtualItems,
  getTotalSize: () => 300,
  measureElement: vi.fn(),
};

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: vi.fn(() => virtualizerMock),
}));

describe("VirtualList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    virtualItems = [];
  });

  it("calls fetchNextPage when the last rendered item reaches the end of the list", async () => {
    const fetchNextPage = vi.fn();

    virtualItems = [
      { index: 0, key: "0", start: 0 },
      { index: 1, key: "1", start: 100 },
    ];

    const { rerender } = render(
      <VirtualList
        items={["one", "two", "three"]}
        hasNextPage
        fetchNextPage={fetchNextPage}
      >
        {(item) => <div>{item}</div>}
      </VirtualList>
    );

    expect(fetchNextPage).not.toHaveBeenCalled();

    virtualItems = [
      { index: 1, key: "1", start: 100 },
      { index: 2, key: "2", start: 200 },
    ];

    rerender(
      <VirtualList
        items={["one", "two", "three"]}
        hasNextPage
        fetchNextPage={fetchNextPage}
      >
        {(item) => <div>{item}</div>}
      </VirtualList>
    );

    await waitFor(() => {
      expect(fetchNextPage).toHaveBeenCalledTimes(1);
    });
  });
});
