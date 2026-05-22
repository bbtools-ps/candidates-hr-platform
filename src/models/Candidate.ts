import type { candidateSchema } from "@/schemas";
import type { z } from "zod";

export type Candidate = z.infer<typeof candidateSchema> & {
  id: string;
  isFavorite: boolean;
};
