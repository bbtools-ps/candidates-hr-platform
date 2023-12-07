import { MotionProps, motion } from "framer-motion";
import React, {
  DialogHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

interface IDialogProps
  extends React.DetailedHTMLProps<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  children: React.ReactNode;
}

export type DialogActions = {
  open: () => void;
  close: () => void;
};

const Dialog = forwardRef<DialogActions, IDialogProps>(function Dialog(
  { children, ...rest },
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
    close() {
      dialog.current?.close();
    },
  }));

  return createPortal(
    <motion.dialog
      ref={dialog as React.Ref<HTMLDialogElement>}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded p-6 shadow-sm backdrop:bg-slate-800/70 dark:border dark:border-solid dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:backdrop:bg-slate-900/80 md:w-1/2 lg:w-1/3"
      {...(rest as DialogHTMLAttributes<HTMLDialogElement> & MotionProps)}
    >
      {children}
    </motion.dialog>,
    document.getElementById("dialogs") as HTMLDivElement,
  );
});

export default Dialog;
