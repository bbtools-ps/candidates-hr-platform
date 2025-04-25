import { z } from "zod";

export const CANDIDATE_SCHEMA = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  dateOfBirth: z.string().date("Invalid date format"),
  contactNumber: z
    .string()
    .trim()
    .min(1, { message: "Contact number is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  skills: z
    .array(
      z.object({
        id: z.string(),
        value: z.string().trim().min(1, { message: "Skill is required" }),
      })
    )
    .min(1, { message: "Skills are required" }),
  notes: z.string().optional(),
});
