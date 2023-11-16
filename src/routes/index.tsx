import { DUMMY_CANDIDATES } from "@/data/data";
import { useCandidatesStore } from "@/store/candidates";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CandidatesList from "../components/CandidatesList/CandidatesList";

const HomePage = () => {
  const { searchCandidate, searchTerm, filteredCandidates, removeCandidate } =
    useCandidatesStore();

  const [isLoading, setIsLoading] = useState(true);
  const { setCandidates } = useCandidatesStore();

  useEffect(() => {
    setCandidates(DUMMY_CANDIDATES);
    setIsLoading(false);
  }, [setCandidates]);

  const initialRender = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!initialRender.current || !searchTerm || isLoading) return;

    searchCandidate(searchTerm);
    initialRender.current = false;
  }, [searchCandidate, searchTerm, isLoading]);

  return (
    <>
      <CandidatesList
        candidates={filteredCandidates}
        onRemoveCandidate={removeCandidate}
        onEditCandidate={(candidate) =>
          navigate("/edit-candidate", { state: candidate })
        }
        isLoading={isLoading}
      />
      <Outlet />
    </>
  );
};

export default HomePage;
