import { useElementSize } from "@/common/hooks";
import { Candidate } from "@/common/models";
import { CandidatesListContext } from "@/store/candidates-list-context";
import { useCallback, useContext, useEffect, useRef } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import CandidateItem from "./CandidateItem/CandidateItem";
import classes from "./CandidatesList.module.css";

interface ICandidatesListProps {
  candidates: Candidate[];
  onRemoveCandidate: (candidateId: string) => void;
  onEditCandidate: (candidate: Candidate) => void;
}

const CandidatesList: React.FC<ICandidatesListProps> = ({
  candidates,
  onRemoveCandidate,
  onEditCandidate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { height } = useElementSize(containerRef);
  const { setListHeight, listHeight } = useContext(CandidatesListContext);

  useEffect(() => {
    if (!height) return;

    setListHeight(height);
  }, [height, setListHeight]);

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

  if (!candidates.length)
    return (
      <div className={classes["no-results"]} data-cy="no-results">
        No candidates found.
      </div>
    );

  return (
    <div className={classes["candidates-list-wrapper"]} ref={containerRef}>
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
    </div>
  );
};

export default CandidatesList;
