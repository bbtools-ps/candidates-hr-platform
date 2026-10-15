import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import ResizeObserver from "resize-observer-polyfill";
import { afterEach, vi } from "vite-plus/test";

afterEach(() => {
  cleanup();
});

vi.stubGlobal("ResizeObserver", ResizeObserver);
