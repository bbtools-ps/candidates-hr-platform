import Button from "@/components/UI/Button/Button";
import { useFormContext } from "../hooks";

interface SubmitButtonProps {
  label?: string;
  childrenRenderer?: (isSubmitting: boolean) => React.ReactNode;
}

export default function SubmitButton({
  label,
  childrenRenderer,
}: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          data-cy="submit-btn"
        >
          {label ?? childrenRenderer?.(isSubmitting) ?? "Submit"}
        </Button>
      )}
    </form.Subscribe>
  );
}
