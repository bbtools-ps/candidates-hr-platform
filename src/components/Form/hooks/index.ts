import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import DateField from "../components/DateField";
import SubmitButton from "../components/SubmitButton";
import TagsField from "../components/TagsField";
import TextAreaField from "../components/TextAreaField";
import TextField from "../components/TextField";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TagsField,
    DateField,
    TextAreaField,
  },
  formComponents: {
    SubmitButton,
  },
});
