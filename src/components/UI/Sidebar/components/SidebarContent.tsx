import { cn } from "@/utils/cn";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../hooks";
import { useFocusTrap } from "../hooks/useFocusTrap";

interface SidebarContentProps {
  title?: string;
  closeSidebarLabel?: string;
  children: React.ReactNode;
}

export default function SidebarContent({
  title,
  closeSidebarLabel,
  children,
}: SidebarContentProps) {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, triggerRef } = useSidebarContext();

  const handleClose = useCallback(() => {
    if (triggerRef?.current && triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
      setIsOpen(false);
    }
  }, [setIsOpen, triggerRef]);

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal || !isOpen) return;

    modal.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    modal.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ ref: modalRef });

  return (
    <>
      {createPortal(
        <>
          {isOpen && (
            <div
              role="button"
              tabIndex={0}
              onClick={handleClose}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClose();
                }
              }}
              aria-label={closeSidebarLabel ?? t("CloseSidebarFallback_Label")}
              className="fixed inset-0 z-40 bg-black/50"
            />
          )}
          <aside
            ref={modalRef}
            tabIndex={-1}
            className={cn(
              "fixed top-0 right-0 z-50 h-full w-full max-w-sm transform bg-white p-4 text-black shadow-lg outline-hidden transition-transform duration-300 ease-in-out dark:bg-slate-900 dark:text-white",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={handleClose}
                className="h-8 w-8 rounded-sm"
                aria-label={
                  closeSidebarLabel ?? t("CloseSidebarFallback_Label")
                }
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <Fragment key={String(isOpen)}>{children}</Fragment>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
