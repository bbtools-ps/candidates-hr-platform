import type { Candidate } from "@/models";
import { motion } from "motion/react";
import { Virtuoso } from "react-virtuoso";
import CandidateItem from "./CandidateItem";

interface IProps {
  candidates: Candidate[];
  isLoading: boolean;
  onRemoveCandidate: (candidateId: string) => void;
  onEditCandidate: (candidate: Candidate) => void;
}

export default function CandidatesList({
  candidates,
  isLoading,
  onRemoveCandidate,
  onEditCandidate,
}: IProps) {
  return (
    <section className="flex flex-1 flex-col">
      {isLoading && <p>Loading...</p>}
      {candidates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 items-center justify-center text-2xl text-white"
          data-cy="no-results"
        >
          No candidates found.
        </motion.div>
      )}
      {candidates.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1"
        >
          <Virtuoso
            height="100%"
            data={candidates}
            itemContent={(_, item) => (
              <div className="flex justify-center">
                <CandidateItem
                  candidate={item}
                  onRemoveCandidate={onRemoveCandidate}
                  onEditCandidate={onEditCandidate}
                />
              </div>
            )}
          />
        </motion.div>
      )}
    </section>
  );
}
