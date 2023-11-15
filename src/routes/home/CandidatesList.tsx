import { Candidate } from "@/common/models";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import CandidateItem from "./CandidateItem/CandidateItem";
import classes from "./CandidatesList.module.css";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const [listHeight, setListHeight] = useState(0);

  useLayoutEffect(() => {
    setListHeight(containerRef.current?.clientHeight || 0);
  }, []);

  const renderRow = useCallback(
    ({ index, style }: ListChildComponentProps) => (
      <div style={{ ...style, display: "flex", justifyContent: "center" }}>
        <CandidateItem
          key={candidates[index].id}
          candidate={candidates[index]}
          onRemoveCandidate={onRemoveCandidate}
          onEditCandidate={onEditCandidate}
        />
      </div>
    ),
    [candidates, onEditCandidate, onRemoveCandidate]
  );

  console.log(listHeight);

  return (
    <div className={classes["candidates-list-wrapper"]} ref={containerRef}>
      {isLoading && <p>Loading...</p>}
      {candidates.length === 0 && (
        <div className={classes["no-results"]} data-cy="no-results">
          No candidates found.
        </div>
      )}
      {candidates.length && (
        <div className={classes["candidates-list"]}>
          <FixedSizeList
            height={listHeight}
            itemCount={candidates.length}
            itemSize={280}
            width="100%"
          >
            {renderRow}
          </FixedSizeList>
        </div>
      )}
    </div>
  );
};

export default CandidatesList;
