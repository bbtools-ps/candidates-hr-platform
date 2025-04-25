import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import TagsInputField from "../components/TagsInputField";
import TextAreaField from "../components/TextAreaField";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    TagsInputField,
    TextAreaField,
  },
  formComponents: {
    SubmitButton,
  },
});
