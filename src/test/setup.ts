import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import ResizeObserver from "resize-observer-polyfill";
import { afterEach, expect, vi } from "vitest";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

vi.stubGlobal("ResizeObserver", ResizeObserver);
