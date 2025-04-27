import { useEffect } from "react";

const FOCUSABLE_ELEMENTS =
  [
    "a",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "details",
    '[tabindex]:not([tabindex^="-"])',
  ].join(",") ?? [];

const getFocusableElements = (container: HTMLElement) => {
  return Array.from(
    container?.querySelectorAll(FOCUSABLE_ELEMENTS) || []
  ).filter((element) => {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.display !== "none" &&
      style.visibility !== "hidden"
    );
  }) as HTMLElement[];
};

interface FocusTrapParams {
  ref: React.RefObject<HTMLDivElement>;
}

export const useFocusTrap = ({ ref }: FocusTrapParams) => {
  useEffect(() => {
    const modal = ref?.current;

    if (!modal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const pressingShift = e.shiftKey;
      const pressingTab = e.key === "Tab";

      if (pressingTab) {
        const focusableElements = getFocusableElements(modal);

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        // Rotate to the top of focusable list
        if (
          pressingTab &&
          !pressingShift &&
          document.activeElement === lastElement
        ) {
          e.preventDefault();
          (firstElement as HTMLElement)?.focus();
        }
        // Rotate to the bottom of focusable list
        if (
          pressingShift &&
          pressingTab &&
          document.activeElement === firstElement
        ) {
          e.preventDefault();
          (lastElement as HTMLElement)?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref]);
};
