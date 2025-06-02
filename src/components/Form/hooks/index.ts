import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import CheckboxField from "../components/CheckboxField";
import DateField from "../components/DateField";
import EmailField from "../components/EmailField";
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
    CheckboxField,
    DateField,
    EmailField,
    TagsField,
    TextField,
    TextAreaField,
  },
  formComponents: {
    SubmitButton,
  },
});
