import { useElementSize } from "@/hooks";
import { Candidate } from "@/models";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import CandidateItem from "./CandidateItem";

interface ICandidatesListProps {
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
}: ICandidatesListProps) {
  const { ref, height } = useElementSize();

  const renderRow = useCallback(
    ({ index, style }: ListChildComponentProps) => (
      <div style={{ ...style, display: "flex", justifyContent: "center" }}>
        <CandidateItem
          candidate={candidates[index]}
          onRemoveCandidate={onRemoveCandidate}
          onEditCandidate={onEditCandidate}
        />
      </div>
    ),
    [candidates, onEditCandidate, onRemoveCandidate],
  );

  return (
    <div className="flex flex-1 flex-col" ref={ref}>
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
      <div className="h-0">
        {candidates.length > 0 && (
          <FixedSizeList
            height={height}
            itemCount={candidates.length}
            itemSize={280}
            width="100%"
          >
            {renderRow}
          </FixedSizeList>
        )}
      </div>
    </div>
  );
}
