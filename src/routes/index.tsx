import { DUMMY_CANDIDATES } from "@/data/data";
import { useCandidatesStore } from "@/store/candidates";
import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router";
import CandidatesList from "../components/CandidatesList/CandidatesList";

export default function HomePage() {
  const {
    searchCandidate,
    filteredCandidates,
    removeCandidate,
    setCandidates,
    toggleFavorite,
  } = useCandidatesStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCandidates(DUMMY_CANDIDATES);
    setIsLoading(false);
  }, [setCandidates]);

  const [searchParams] = useSearchParams();
  const isFavorite = searchParams.get("isFavorite") === "true";
  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    searchCandidate(searchTerm, isFavorite);
  }, [searchTerm, isFavorite, searchCandidate]);

  return (
    <>
      <CandidatesList
        candidates={filteredCandidates}
        onRemoveCandidate={removeCandidate}
        onToggleFavorite={toggleFavorite}
        isLoading={isLoading}
      />
      <Outlet />
    </>
  );
}
