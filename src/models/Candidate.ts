import type { CANDIDATE_SCHEMA } from "@/constants";
import type { z } from "zod";

export type Candidate = z.infer<typeof CANDIDATE_SCHEMA> & {
  id: string;
  isFavorite: boolean;
};
