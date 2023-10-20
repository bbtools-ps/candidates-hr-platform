import MainMenu from "@/common/components/MainMenu/MainMenu";
import { useCandidatesStore } from "@/store/candidates";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CandidatesList from "./CandidatesList";

const HomePage = () => {
  const {
    reset,
    searchCandidate,
    searchTerm,
    filteredCandidates,
    removeCandidate,
  } = useCandidatesStore();

  const initialRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!initialRender.current || !searchTerm) return;

    searchCandidate(searchTerm);
    initialRender.current = false;
  }, [searchCandidate, searchTerm]);

  return (
    <>
      <MainMenu
        searchInput={searchTerm}
        onChange={(e) => {
          searchCandidate(e.target.value);
        }}
        onAddNewCandidate={() => {
          navigate("/new-candidate");
        }}
        onResetCandidates={reset}
      />
      <CandidatesList
        candidates={filteredCandidates}
        onRemoveCandidate={removeCandidate}
        onEditCandidate={(candidate) =>
          navigate("/edit-candidate", { state: candidate })
        }
      />
    </>
  );
};

export default HomePage;
