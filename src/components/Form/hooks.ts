import { createFormHook } from "@tanstack/react-form";
import CheckboxField from "./components/CheckboxField";
import DateField from "./components/DateField";
import EmailField from "./components/EmailField";
import SubmitButton from "./components/SubmitButton";
import TagsField from "./components/TagsField";
import TextAreaField from "./components/TextAreaField";
import TextField from "./components/TextField";
import { fieldContext, formContext } from "./contexts";

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
