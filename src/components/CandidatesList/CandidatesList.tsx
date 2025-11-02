import type { Candidate } from "@/models";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import VirtualList from "../VirtualList/VirtualList";
import CandidateItem from "./CandidateItem";

interface CandidatesListProps {
  candidates: Candidate[];
  isLoading: boolean;
  onToggleFavorite: (candidateId: string) => void;
  onRemoveCandidate: (candidateId: string) => void;
}

export default function CandidatesList({
  candidates,
  isLoading,
  onToggleFavorite,
  onRemoveCandidate,
}: CandidatesListProps) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-1 flex-col">
      {isLoading && <p>{t("Loading_Label")}</p>}
      {candidates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 items-center justify-center text-2xl text-white"
          data-cy="no-results-placeholder"
        >
          {t("NoCandidatesFound_Label")}
        </motion.div>
      )}
      {candidates.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1"
        >
          <VirtualList items={candidates} className="h-full">
            {(item) => (
              <div className="flex w-full justify-center">
                <CandidateItem
                  candidate={item}
                  onRemoveCandidate={onRemoveCandidate}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            )}
          </VirtualList>
        </motion.div>
      )}
    </section>
  );
}
