import { Candidate } from "@/models";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  allCandidates: Candidate[];
  filteredCandidates: Candidate[];
  searchTerm: string;
};

type Actions = {
  setCandidates: (candidates: Candidate[]) => void;
  addCandidate: (candidate: Candidate) => void;
  editCandidate: (candidate: Candidate) => void;
  removeCandidate: (candidateId: string) => void;
  searchCandidate: (searchTerm: string) => void;
  reset: () => void;
};

export const useCandidatesStore = create<State & Actions>()(
  devtools(
    (set) => ({
      allCandidates: [],
      filteredCandidates: [],
      searchTerm: "",
      setCandidates: (candidates) =>
        set({
          allCandidates: candidates.map((item) => ({
            ...item,
            skills: item.skills.map((item) => ({ ...item })),
          })),
          filteredCandidates: candidates.map((item) => ({
            ...item,
            skills: item.skills.map((item) => ({ ...item })),
          })),
        }),
      addCandidate: (candidate) =>
        set((state) => {
          return {
            allCandidates: [
              candidate,
              ...state.allCandidates.map((item) => ({
                ...item,
                skills: item.skills.map((item) => ({ ...item })),
              })),
            ],
            filteredCandidates: [
              candidate,
              ...state.filteredCandidates.map((item) => ({
                ...item,
                skills: item.skills.map((item) => ({ ...item })),
              })),
            ],
          };
        }),
      editCandidate: (candidate) =>
        set((state) => {
          const editedCandidateAll = state.allCandidates.map((item) => {
            return item.id === candidate.id
              ? {
                  ...candidate,
                  skills: candidate.skills.map((item) => ({ ...item })),
                }
              : { ...item, skills: item.skills.map((item) => ({ ...item })) };
          });
          const editedCandidateFilter = state.filteredCandidates.map((item) => {
            return item.id === candidate.id
              ? {
                  ...candidate,
                  skills: candidate.skills.map((item) => ({ ...item })),
                }
              : { ...item, item: item.skills.map((item) => ({ ...item })) };
          });

          return {
            allCandidates: editedCandidateAll,
            filteredCandidates: editedCandidateFilter,
          };
        }),
      removeCandidate: (candidateId) =>
        set((state) => {
          const removedCandidateAll = state.allCandidates.filter(
            (candidate) => {
              return candidate.id !== candidateId;
            },
          );
          const removedCandidateFilter = state.filteredCandidates.filter(
            (candidate) => {
              return candidate.id !== candidateId;
            },
          );

          return {
            allCandidates: removedCandidateAll,
            filteredCandidates: removedCandidateFilter,
          };
        }),
      searchCandidate: (searchTerm) =>
        set((state) => {
          if (!searchTerm.trim().length) {
            return { filteredCandidates: state.allCandidates, searchTerm };
          }

          const searchTerms = [
            ...new Set(searchTerm.replace(/\s+/g, " ").split(" ")),
          ].map((term) => {
            const escapedSearchInput = term.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&",
            );
            return new RegExp(escapedSearchInput, "i");
          });

          const filteredCandidates = state.allCandidates.filter(
            (candidate) =>
              searchTerms.every((term) => {
                return (
                  term.test(candidate.name) ||
                  candidate.skills.find((skill) => term.test(skill.value))
                );
              }) && candidate,
          );

          return { filteredCandidates, searchTerm };
        }),
      reset: () =>
        set((state) => {
          return {
            allCandidates: state.allCandidates.map((item) => ({
              ...item,
              skills: item.skills.map((item) => ({ ...item })),
            })),
            filteredCandidates: state.allCandidates.map((item) => ({
              ...item,
              skills: item.skills.map((item) => ({ ...item })),
            })),
            searchTerm: "",
          };
        }),
    }),
    { name: "candidates" },
  ),
);
