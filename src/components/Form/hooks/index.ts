import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import TagsInputField from "../components/TagsInputField";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    TagsInputField,
  },
  formComponents: {
    SubmitButton,
  },
});
