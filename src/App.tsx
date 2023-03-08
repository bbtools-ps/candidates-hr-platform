import { useReducer, useState } from "react";
import { Route, useNavigate } from "react-router";
import { Routes } from "react-router-dom";
import Copyright from "./common/components/Copyright/Copyright";
import MainMenu from "./common/components/MainMenu/MainMenu";
import PageNotFound from "./common/components/PageNotFound/PageNotFound";
import Protected from "./common/components/Protected";
import { Candidate } from "./common/models/Candidate";
import { DUMMY_CANDIDATES } from "./data/data";
import EditCandidate from "./screens/edit-candidate/EditCandidate";
import CandidatesList from "./screens/home/CandidatesList";
import NewCandidate from "./screens/new-candidate/NewCandidate";

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
    | "RESET_CANDIDATES";
  payload?:
    | string
    | { _TYPE: "Candidate"; candidate: Candidate }
    | { _TYPE: "Search"; searchTerms: RegExpMatchArray | null };
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
      if (typeof payload !== "string" && payload?._TYPE === "Candidate") {
        return {
          ...state,
          allCandidates: [payload.candidate, ...state.allCandidates],
          filteredCandidates: [payload.candidate, ...state.filteredCandidates],
        };
      } else {
        return state;
      }
    case "EDIT_CANDIDATE":
      if (typeof payload !== "string" && payload?._TYPE === "Candidate") {
        const editedCandidateAll = state.allCandidates.map((candidate) => {
          return candidate.id === payload.candidate?.id
            ? payload.candidate
            : candidate;
        });
        const editedCandidateFilter = state.filteredCandidates.map(
          (candidate) => {
            return candidate.id === payload.candidate?.id
              ? payload.candidate
              : candidate;
          }
        );
        return {
          ...state,
          allCandidates: editedCandidateAll,
          filteredCandidates: editedCandidateFilter,
        };
      } else {
        return state;
      }
    case "REMOVE_CANDIDATE":
      if (typeof payload === "string") {
        const removedCandidateAll = state.allCandidates.filter((candidate) => {
          return candidate.id !== payload;
        });
        const removedCandidateFilter = state.filteredCandidates.filter(
          (candidate) => {
            return candidate.id !== payload;
          }
        );
        return {
          ...state,
          allCandidates: removedCandidateAll,
          filteredCandidates: removedCandidateFilter,
        };
      } else {
        return state;
      }
    case "SEARCH_CANDIDATES":
      if (
        typeof payload !== "string" &&
        payload?._TYPE === "Search" &&
        payload.searchTerms?.length
      ) {
        const filteredCandidates = state.allCandidates.filter(
          (candidate) =>
            payload.searchTerms?.some((term) => {
              const termReg = new RegExp(term, "i");
              return (
                termReg.test(candidate.name) || termReg.test(candidate.skills)
              );
            }) && candidate
        );
        return { ...state, filteredCandidates };
      } else {
        return { ...state, filteredCandidates: [...state.allCandidates] };
      }
    case "RESET_CANDIDATES":
      return { ...state, filteredCandidates: [...state.allCandidates] };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(candidatesReducer, INITIAL_VALUES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [editCandidate, setEditCandidate] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    // create array of search terms
    const searchTerms = e.target.value.match(/\w+/g);
    // loop through each search term
    dispatch({
      type: "SEARCH_CANDIDATES",
      payload: { _TYPE: "Search", searchTerms },
    });
  };

  const handleResetCandidates = () => {
    setSearchInput("");
    dispatch({ type: "RESET_CANDIDATES" });
  };

  // remove candidate
  const handleRemoveCandidate = (id: string) => {
    dispatch({ type: "REMOVE_CANDIDATE", payload: id });
  };

  // show add new candidate form
  const showNewCandidateForm = () => {
    navigate("/new-candidate");
  };

  // show edit candidate from
  const showEditCandidateForm = (candidate: Candidate) => {
    setEditCandidate(true);
    setSelectedCandidate(candidate);
    navigate("/edit-candidate");
  };

  // show all candidates when pressing "Cancel" on the form
  const handleCancel = () => {
    navigate("/");
  };

  // add candidate into the list
  const handleAddCandidate = (candidate: Candidate) => {
    dispatch({
      type: "ADD_CANDIDATE",
      payload: { _TYPE: "Candidate", candidate },
    });
    handleResetCandidates();
    navigate("/");
  };

  // edit candidate from the list
  const handleEditCandidate = (candidate: Candidate) => {
    dispatch({
      type: "EDIT_CANDIDATE",
      payload: { _TYPE: "Candidate", candidate },
    });
    navigate("/");
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainMenu
                onResetCandidates={handleResetCandidates}
                onAddNewCandidate={showNewCandidateForm}
                searchInput={searchInput}
                onChange={handleInputChange}
              />
              <CandidatesList
                candidates={state.filteredCandidates}
                removeCandidate={handleRemoveCandidate}
                editCandidate={showEditCandidateForm}
              />
            </>
          }
        />
        <Route
          path="/new-candidate"
          element={
            <NewCandidate
              onCancel={handleCancel}
              onSubmit={handleAddCandidate}
            />
          }
        />
        <Route
          path="/edit-candidate"
          element={
            <Protected condition={editCandidate}>
              {selectedCandidate && (
                <EditCandidate
                  onCancel={handleCancel}
                  onSubmit={handleEditCandidate}
                  candidate={selectedCandidate}
                />
              )}
            </Protected>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Copyright author="Bogdan Bogdanovic" />
    </div>
  );
};

export default App;
