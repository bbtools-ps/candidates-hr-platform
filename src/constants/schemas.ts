import { t } from "i18next";
import { z } from "zod";

export const CANDIDATE_SCHEMA = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: t("NameRequired_Label") }),
  dateOfBirth: z.iso.date(t("DateOfBirthRequired_Label")),
  contactNumber: z
    .string()
    .trim()
    .min(1, { error: t("ContactNumberRequired_Label") }),
  email: z.email({ error: t("InvalidEmail_Label") }),
  skills: z
    .array(
      z.object({
        id: z.string(),
        value: z
          .string()
          .trim()
          .min(1, { error: t("SkillRequired_Label") }),
      })
    )
    .min(1, { error: t("SkillsRequired_Label") }),
  notes: z.string().trim().optional(),
});
