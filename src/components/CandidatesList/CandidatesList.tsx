import { useElementSize } from "@/hooks";
import type { Candidate } from "@/models";
import { motion } from "framer-motion";
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
  const { ref, height } = useElementSize();

  return (
    <section className="flex flex-1 flex-col" ref={ref}>
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
          className="h-0"
        >
          <Virtuoso
            style={{ height }}
            data={candidates}
            itemContent={(index, item) => (
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
