import type { ButtonProps } from "@/components/UI/Button";
import Button from "@/components/UI/Button";
import { useFormContext } from "../hooks";

interface SubmitButtonProps extends Omit<
  ButtonProps,
  "ref" | "type" | "children" | "disabled"
> {
  children: (isSubmitting: boolean) => React.ReactNode;
}

export default function SubmitButton({ children, ...rest }: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button type="submit" disabled={!canSubmit || isSubmitting} {...rest}>
          {children(isSubmitting)}
        </Button>
      )}
    </form.Subscribe>
  );
}
