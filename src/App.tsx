import { useReducer, useState } from "react";
import "./App.css";
import EditCandidate from "./components/CandidateItem/EditCandidate";
import NewCandidate from "./components/CandidateItem/NewCandidate";
import CandidatesList from "./components/CandidatesList/CandidatesList";
import Copyright from "./components/Copyright/Copyright";
import MainMenu from "./components/MainMenu";
import Logo from "./components/UI/Logo";
import { DUMMY_CANDIDATES } from "./data/data";
import { Candidate } from "./models/Candidate";

interface AppState {
  allCandidates: Candidate[];
  showAddCandidate: boolean;
  showEditCandidate: boolean;
  filteredCandidates: Candidate[];
}

interface AppAction {
  type:
    | "ADD_CANDIDATE"
    | "EDIT_CANDIDATE"
    | "REMOVE_CANDIDATE"
    | "FILTER_CANDIDATES"
    | "RESET_CANDIDATES"
    | "SHOW_ADD_CANDIDATE"
    | "SHOW_EDIT_CANDIDATE"
    | "SHOW_ALL_CANDIDATES";
  payload?: { id?: string; candidate?: Candidate; searchTerm?: RegExp };
}

const INITIAL_VALUES = {
  allCandidates: DUMMY_CANDIDATES,
  showAddCandidate: false,
  showEditCandidate: false,
  filteredCandidates: [...DUMMY_CANDIDATES],
};

const candidatesReducer = (state: AppState, action: AppAction) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_CANDIDATE":
      return {
        ...state,
        allCandidates: [payload.candidate, ...state.allCandidates],
        filteredCandidates: [payload.candidate, ...state.allCandidates],
      };
    case "EDIT_CANDIDATE":
      const editedCandidates = state.allCandidates.map((candidate) => {
        return candidate.id === payload.id ? payload.candidate : candidate;
      });
      return {
        ...state,
        allCandidates: editedCandidates,
        filteredCandidates: editedCandidates,
      };
    case "REMOVE_CANDIDATE":
      const removedCandidatesAll = state.allCandidates.filter((candidate) => {
        return candidate.id !== payload.id;
      });
      const removedCandidatesFilter = state.filteredCandidates.filter(
        (candidate) => {
          return candidate.id !== payload.id;
        }
      );
      return {
        ...state,
        allCandidates: removedCandidatesAll,
        filteredCandidates: removedCandidatesFilter,
      };
    case "FILTER_CANDIDATES":
      const filteredCandidates = [...state.allCandidates].filter(
        (candidate) => {
          return (
            payload.searchTerm.test(candidate.name) ||
            payload.searchTerm.test(candidate.skills)
          );
        }
      );
      return { ...state, filteredCandidates };
    case "RESET_CANDIDATES":
      return { ...state, filteredCandidates: [...state.allCandidates] };
    case "SHOW_ADD_CANDIDATE":
      return { ...state, showAddCandidate: true, showEditCandidate: false };
    case "SHOW_EDIT_CANDIDATE":
      return { ...state, showAddCandidate: false, showEditCandidate: true };
    case "SHOW_ALL_CANDIDATES":
      return { ...state, showAddCandidate: false, showEditCandidate: false };
    default:
      throw new Error();
  }
};

const App = () => {
  const [candidates, dispatchCandidates] = useReducer(
    candidatesReducer,
    INITIAL_VALUES
  );
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>();

  // filter candidates based on their name, skills
  const filterCandidatesHandler = (filterValue: string) => {
    // create array of search terms
    const searchTerms = filterValue.trim().split(" ");
    // loop through each search term
    searchTerms.forEach((term: string) => {
      // create regex for each search term
      const searchTerm = new RegExp(term, "i");
      dispatchCandidates({
        type: "FILTER_CANDIDATES",
        payload: { searchTerm },
      });
    });
  };

  // reset candidates
  const resetCandidatesHandler = () => {
    dispatchCandidates({ type: "RESET_CANDIDATES" });
  };

  // remove candidate
  const removeCandidateHandler = (id: string) => {
    dispatchCandidates({ type: "REMOVE_CANDIDATE", payload: { id } });
  };

  // show form for adding new candidate
  const addNewCandidateHandler = () => {
    dispatchCandidates({ type: "SHOW_ADD_CANDIDATE" });
  };

  // edit candidate
  const editCandidateHandler = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    dispatchCandidates({ type: "SHOW_EDIT_CANDIDATE" });
  };

  // show all candidates when pressing "Cancel" on the form
  const cancelHandler = () => {
    dispatchCandidates({ type: "SHOW_ALL_CANDIDATES" });
  };

  // add candidate into the list
  const addHandler = (candidate: Candidate) => {
    dispatchCandidates({ type: "ADD_CANDIDATE", payload: { candidate } });
    dispatchCandidates({ type: "SHOW_ALL_CANDIDATES" });
  };

  // edit candidate from the list
  const editHandler = (candidate: Candidate) => {
    dispatchCandidates({ type: "EDIT_CANDIDATE", payload: { candidate } });
    dispatchCandidates({ type: "SHOW_ALL_CANDIDATES" });
  };

  return (
    <div className="app">
      <Logo />
      {candidates.showAddCandidate ? (
        <NewCandidate onCancel={cancelHandler} onSubmit={addHandler} />
      ) : candidates.showEditCandidate ? (
        <EditCandidate
          onCancel={cancelHandler}
          onSubmit={editHandler}
          candidate={selectedCandidate}
        />
      ) : (
        <>
          <MainMenu
            filterCandidates={filterCandidatesHandler}
            resetCandidates={resetCandidatesHandler}
            addNewCandidate={addNewCandidateHandler}
          />
          <CandidatesList
            candidates={candidates.filteredCandidates}
            removeCandidate={removeCandidateHandler}
            editCandidate={editCandidateHandler}
          />
        </>
      )}
      <Copyright author="Bogdan Bogdanovic" />
    </div>
  );
};

export default App;
