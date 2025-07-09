import type { ButtonProps } from "@/components/UI/Button/Button";
import Button from "@/components/UI/Button/Button";
import { useFormContext } from "../hooks";

interface SubmitButtonProps
  extends Omit<ButtonProps, "ref" | "type" | "children" | "disabled"> {
  label?: string;
  childrenRenderer?: (isSubmitting: boolean) => React.ReactNode;
}

export default function SubmitButton({
  label,
  childrenRenderer,
  ...rest
}: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button type="submit" disabled={!canSubmit || isSubmitting} {...rest}>
          {label ?? childrenRenderer?.(isSubmitting) ?? "Submit"}
        </Button>
      )}
    </form.Subscribe>
  );
}
