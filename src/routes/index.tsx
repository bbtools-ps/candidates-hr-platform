import { DUMMY_CANDIDATES } from "@/data/data";
import { useCandidatesStore } from "@/store/candidates";
import { useEffect, useRef, useState } from "react";
import { Outlet, useSearchParams } from "react-router";
import CandidatesList from "../components/CandidatesList/CandidatesList";

export default function HomePage() {
  const {
    searchCandidate,
    searchTerm,
    filteredCandidates,
    removeCandidate,
    setCandidates,
    toggleFavorite,
    filterByFavorite,
  } = useCandidatesStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCandidates(DUMMY_CANDIDATES);
    setIsLoading(false);
  }, [setCandidates]);

  const initialRender = useRef(true);

  const [searchParams] = useSearchParams();
  const isFavorite = searchParams.get("isFavorite") === "true";

  useEffect(() => {
    if (!initialRender.current || !searchTerm || isLoading) return;

    searchCandidate(searchTerm, isFavorite);
    initialRender.current = false;
  }, [searchCandidate, searchTerm, isLoading, isFavorite]);

  return (
    <>
      <CandidatesList
        candidates={filteredCandidates}
        onRemoveCandidate={removeCandidate}
        onToggleFavorite={(candidateId) => {
          toggleFavorite(candidateId);
          if (isFavorite) {
            filterByFavorite(true);
          }
        }}
        isLoading={isLoading}
      />
      <Outlet />
    </>
  );
}
