import { useReducer, useState } from "react";
import "./App.css";
import { Candidate } from "./common/models/Candidate";
import CandidatesList from "./components/CandidatesList/CandidatesList";
import Copyright from "./components/Copyright/Copyright";
import EditCandidate from "./components/EditCandidate/EditCandidate";
import MainMenu from "./components/MainMenu/MainMenu";
import NewCandidate from "./components/NewCandidate/NewCandidate";
import { DUMMY_CANDIDATES } from "./data/data";

interface AppState {
  allCandidates: Candidate[];
  showAddCandidate: boolean;
  showEditCandidate: boolean;
  filteredCandidates: Candidate[];
  searchTerm: string;
}

interface AppAction {
  type:
    | "ADD_CANDIDATE"
    | "EDIT_CANDIDATE"
    | "REMOVE_CANDIDATE"
    | "SEARCH_CANDIDATES"
    | "RESET_CANDIDATES"
    | "SHOW_ADD_CANDIDATE"
    | "SHOW_EDIT_CANDIDATE"
    | "SHOW_ALL_CANDIDATES";
  payload?:
    | string
    | { _TYPE: "Candidate"; candidate?: Candidate }
    | { _TYPE: "RegExp"; searchTermReg?: RegExp };
}

const INITIAL_VALUES = {
  allCandidates: DUMMY_CANDIDATES,
  showAddCandidate: false,
  showEditCandidate: false,
  filteredCandidates: [...DUMMY_CANDIDATES],
  searchTerm: "",
};

const candidatesReducer = (state: AppState, action: AppAction) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_CANDIDATE":
      if (typeof payload !== "string" && payload._TYPE === "Candidate") {
        return {
          ...state,
          allCandidates: [payload.candidate, ...state.allCandidates],
          filteredCandidates: [payload.candidate, ...state.filteredCandidates],
        };
      } else {
        return state;
      }
    case "EDIT_CANDIDATE":
      if (typeof payload !== "string" && payload._TYPE === "Candidate") {
        const editedCandidates = state.allCandidates.map((candidate) => {
          return candidate.id === payload.candidate.id
            ? payload.candidate
            : candidate;
        });
        return {
          ...state,
          allCandidates: editedCandidates,
          filteredCandidates: editedCandidates,
        };
      } else {
        return state;
      }
    case "REMOVE_CANDIDATE":
      if (typeof payload === "string") {
        const removedCandidatesAll = state.allCandidates.filter((candidate) => {
          return candidate.id !== payload;
        });
        const removedCandidatesFilter = state.filteredCandidates.filter(
          (candidate) => {
            return candidate.id !== payload;
          }
        );
        return {
          ...state,
          allCandidates: removedCandidatesAll,
          filteredCandidates: removedCandidatesFilter,
        };
      } else {
        return state;
      }
    case "SEARCH_CANDIDATES":
      if (typeof payload !== "string" && payload._TYPE === "RegExp") {
        const filteredCandidates = [...state.allCandidates].filter(
          (candidate) => {
            return (
              payload.searchTermReg.test(candidate.name) ||
              payload.searchTermReg.test(candidate.skills)
            );
          }
        );
        return { ...state, filteredCandidates };
      } else {
        return state;
      }
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
  const [state, dispatch] = useReducer(candidatesReducer, INITIAL_VALUES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>();
  const [searchInput, setSearchInput] = useState<string>("");

  // filter candidates based on their name, skills
  const filterCandidatesHandler = (filterValue: string) => {
    // create array of search terms
    const searchTerms = filterValue.trim().split(" ");
    // loop through each search term
    searchTerms.forEach((term: string) => {
      // create regex for each search term
      const searchTermReg = new RegExp(term, "i");
      dispatch({
        type: "SEARCH_CANDIDATES",
        payload: { _TYPE: "RegExp", searchTermReg },
      });
    });
  };

  // reset candidates
  const resetCandidatesHandler = () => {
    dispatch({ type: "RESET_CANDIDATES" });
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    filterCandidatesHandler(e.target.value);
  };

  const resetHandler = () => {
    setSearchInput("");
    resetCandidatesHandler();
  };

  // remove candidate
  const removeCandidateHandler = (id: string) => {
    dispatch({ type: "REMOVE_CANDIDATE", payload: id });
  };

  // show form for adding new candidate
  const addNewCandidateHandler = () => {
    dispatch({ type: "SHOW_ADD_CANDIDATE" });
  };

  // edit candidate
  const editCandidateHandler = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    dispatch({ type: "SHOW_EDIT_CANDIDATE" });
  };

  // show all candidates when pressing "Cancel" on the form
  const cancelHandler = () => {
    dispatch({ type: "SHOW_ALL_CANDIDATES" });
  };

  // add candidate into the list
  const addHandler = (candidate: Candidate) => {
    dispatch({
      type: "ADD_CANDIDATE",
      payload: { _TYPE: "Candidate", candidate },
    });
    dispatch({ type: "SHOW_ALL_CANDIDATES" });
  };

  // edit candidate from the list
  const editHandler = (candidate: Candidate) => {
    dispatch({
      type: "EDIT_CANDIDATE",
      payload: { _TYPE: "Candidate", candidate },
    });
    dispatch({ type: "SHOW_ALL_CANDIDATES" });
  };

  return (
    <div className="app">
      {state.showAddCandidate ? (
        <NewCandidate onCancel={cancelHandler} onSubmit={addHandler} />
      ) : state.showEditCandidate ? (
        <EditCandidate
          onCancel={cancelHandler}
          onSubmit={editHandler}
          candidate={selectedCandidate}
        />
      ) : (
        <>
          <MainMenu
            resetCandidates={resetHandler}
            addNewCandidate={addNewCandidateHandler}
            searchInput={searchInput}
            onChange={changeInputHandler}
          />
          <CandidatesList
            candidates={state.filteredCandidates}
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
