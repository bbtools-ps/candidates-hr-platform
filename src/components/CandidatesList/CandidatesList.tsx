import { useElementSize } from "@/common/hooks/useElementSize";
import { Candidate } from "@/common/models";
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

const CandidatesList: React.FC<ICandidatesListProps> = ({
  candidates,
  isLoading,
  onRemoveCandidate,
  onEditCandidate,
}) => {
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
          className="text-white flex flex-1 items-center justify-center text-2xl"
          data-cy="no-results"
        >
          No candidates found.
        </motion.div>
      )}
      {candidates.length && (
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
  );
};

export default CandidatesList;
