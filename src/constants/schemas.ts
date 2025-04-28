import { t } from "i18next";
import { z } from "zod";

export const CANDIDATE_SCHEMA = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: t("NameRequired_Label") }),
  dateOfBirth: z.string().date(t("DateOfBirthRequired_Label")),
  contactNumber: z
    .string()
    .trim()
    .min(1, { message: t("ContactNumberRequired_Label") }),
  email: z
    .string()
    .trim()
    .min(1, { message: t("EmailRequired_Label") })
    .email({ message: t("InvalidEmailAddress_Label") }),
  skills: z
    .array(
      z.object({
        id: z.string(),
        value: z
          .string()
          .trim()
          .min(1, { message: t("SkillRequired_Label") }),
      })
    )
    .min(1, { message: t("SkillsRequired_Label") }),
  notes: z.string().trim().optional(),
});
