import { cn } from "@/utils/cn";
import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";

type CheckboxBaseProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  hasError?: boolean;
  isRequired?: boolean;
};

export type CheckboxProps =
  | (CheckboxBaseProps & {
      label: string;
      id: string;
    })
  | (CheckboxBaseProps & {
      label?: undefined;
      id?: string;
    });

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, hasError, isRequired, ...rest },
  ref
) {
  return (
    <div className="flex gap-3">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className={cn(
          "border-gray hover:border-blue w-full flex-1 truncate rounded-sm border-2 border-solid bg-transparent px-4 py-2 text-base duration-100 dark:border-slate-600 dark:hover:border-sky-400",
          { "border-red bg-rose-300": hasError }
        )}
        {...rest}
      />
      {label && id && (
        <label htmlFor={id}>
          {label}
          {isRequired && (
            <span aria-hidden="true" className="ml-1">
              *
            </span>
          )}
        </label>
      )}
    </div>
  );
});

export default Checkbox;
