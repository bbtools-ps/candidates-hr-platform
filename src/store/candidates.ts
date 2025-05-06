import type { Candidate } from "@/models";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  allCandidates: Candidate[];
  filteredCandidates: Candidate[];
};

type Actions = {
  setCandidates: (candidates: Candidate[]) => void;
  addCandidate: (candidate: Candidate) => void;
  editCandidate: (candidate: Candidate) => void;
  removeCandidate: (candidateId: string) => void;
  filterCandidates: (searchTerm: string, isFavorite: boolean) => void;
  toggleFavorite: (candidateId: string) => void;
  reset: () => void;
};

export const useCandidatesStore = create<State & Actions>()(
  devtools(
    (set) => ({
      allCandidates: [],
      filteredCandidates: [],
      setCandidates: (candidates) =>
        set({
          allCandidates: candidates,
          filteredCandidates: candidates,
        }),
      addCandidate: (candidate) =>
        set((state) => {
          return {
            allCandidates: [candidate, ...state.allCandidates],
            filteredCandidates: [candidate, ...state.filteredCandidates],
          };
        }),
      editCandidate: (candidate) =>
        set((state) => {
          return {
            allCandidates: state.allCandidates.map((item) => {
              return item.id === candidate.id ? candidate : item;
            }),
            filteredCandidates: state.filteredCandidates.map((item) => {
              return item.id === candidate.id ? candidate : item;
            }),
          };
        }),
      removeCandidate: (candidateId) =>
        set((state) => {
          return {
            allCandidates: state.allCandidates.filter((candidate) => {
              return candidate.id !== candidateId;
            }),
            filteredCandidates: state.filteredCandidates.filter((candidate) => {
              return candidate.id !== candidateId;
            }),
          };
        }),
      filterCandidates: (searchTerm, isFavorite) =>
        set((state) => {
          if (!searchTerm.trim().length) {
            const filteredCandidates = isFavorite
              ? state.allCandidates.filter((candidate) => candidate.isFavorite)
              : state.allCandidates;
            return { filteredCandidates };
          }

          const searchTerms = [
            ...new Set(searchTerm.replace(/\s+/g, " ").split(" ")),
          ].map((term) => {
            const escapedSearchInput = term.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            );
            return new RegExp(escapedSearchInput, "i");
          });

          const filteredCandidates = state.allCandidates.filter(
            (candidate) =>
              searchTerms.every((term) => {
                return (
                  term.test(candidate.name ?? "") ||
                  candidate.skills?.find((skill) => term.test(skill.value))
                );
              }) &&
              (!isFavorite || candidate.isFavorite)
          );

          return { filteredCandidates };
        }),
      toggleFavorite: (candidateId) =>
        set((state) => {
          return {
            allCandidates: state.allCandidates.map((candidate) => {
              return candidate.id === candidateId
                ? { ...candidate, isFavorite: !candidate.isFavorite }
                : candidate;
            }),
            filteredCandidates: state.filteredCandidates.map((candidate) => {
              return candidate.id === candidateId
                ? { ...candidate, isFavorite: !candidate.isFavorite }
                : candidate;
            }),
          };
        }),
      reset: () =>
        set((state) => {
          return {
            allCandidates: [...state.allCandidates],
            filteredCandidates: [...state.allCandidates],
          };
        }),
    }),
    { name: "candidates" }
  )
);
