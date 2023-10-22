import MainMenu from "@/common/components/MainMenu/MainMenu";
import { useCandidatesStore } from "@/store/candidates";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CandidatesList from "./CandidatesList";

interface IHomePageProps {
  isLoading: boolean;
}

const HomePage: React.FC<IHomePageProps> = ({ isLoading }) => {
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
    if (!initialRender.current || !searchTerm || isLoading) return;

    searchCandidate(searchTerm);
    initialRender.current = false;
  }, [searchCandidate, searchTerm, isLoading]);

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
      {!isLoading && (
        <CandidatesList
          candidates={filteredCandidates}
          onRemoveCandidate={removeCandidate}
          onEditCandidate={(candidate) =>
            navigate("/edit-candidate", { state: candidate })
          }
        />
      )}
      {isLoading && <p style={{ color: "#fff" }}>Loading...</p>}
    </>
  );
};

export default HomePage;
