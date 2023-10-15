import { useReducer, useState } from "react";
import { Route, useNavigate } from "react-router";
import { Routes } from "react-router-dom";
import Copyright from "./common/components/Footer/Footer";
import MainMenu from "./common/components/MainMenu/MainMenu";
import Protected from "./common/components/Protected";
import {
  Candidate,
  IAppAction,
  IAppActionType,
  IAppState,
} from "./common/models";
import { DUMMY_CANDIDATES } from "./data/data";
import PageNotFound from "./screens/404/PageNotFound";
import EditCandidate from "./screens/edit-candidate/EditCandidate";
import CandidatesList from "./screens/home/CandidatesList";
import NewCandidate from "./screens/new-candidate/NewCandidate";
import CandidatesListContextProvider from "./store/candidates-list-context";

const INITIAL_VALUES = {
  allCandidates: DUMMY_CANDIDATES,
  showAddCandidate: false,
  showEditCandidate: false,
  filteredCandidates: [...DUMMY_CANDIDATES],
  searchTerm: "",
};

const candidatesReducer = (state: IAppState, action: IAppAction) => {
  const { type, payload } = action;
  switch (type) {
    case IAppActionType.ADD_CANDIDATE:
      if (payload?._TYPE !== IAppActionType.ADD_CANDIDATE) return state;

      return {
        ...state,
        allCandidates: [payload.candidate, ...state.allCandidates],
        filteredCandidates: [payload.candidate, ...state.filteredCandidates],
      };
    case IAppActionType.EDIT_CANDIDATE:
      if (payload?._TYPE !== IAppActionType.EDIT_CANDIDATE) return state;

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
    case IAppActionType.REMOVE_CANDIDATE:
      if (payload?._TYPE !== IAppActionType.REMOVE_CANDIDATE) return state;

      const removedCandidateAll = state.allCandidates.filter((candidate) => {
        return candidate.id !== payload.id;
      });
      const removedCandidateFilter = state.filteredCandidates.filter(
        (candidate) => {
          return candidate.id !== payload.id;
        }
      );

      return {
        ...state,
        allCandidates: removedCandidateAll,
        filteredCandidates: removedCandidateFilter,
      };
    case IAppActionType.SEARCH_CANDIDATES:
      if (
        payload?._TYPE !== IAppActionType.SEARCH_CANDIDATES ||
        !payload.searchTerms?.length
      )
        return { ...state, filteredCandidates: [...state.allCandidates] };

      const searchTerms = payload.searchTerms
        .replace(/\s+/g, " ")
        .split(" ")
        .map((term) => {
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
              term.test(candidate.name) ||
              candidate.skills.find((skill) => term.test(skill))
            );
          }) && candidate
      );

      return { ...state, filteredCandidates };
    case IAppActionType.RESET_CANDIDATES:
      return { ...state, filteredCandidates: [...state.allCandidates] };
    default:
      return state;
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
    dispatch({
      type: IAppActionType.SEARCH_CANDIDATES,
      payload: {
        _TYPE: IAppActionType.SEARCH_CANDIDATES,
        searchTerms: e.target.value,
      },
    });
  };

  const handleResetCandidates = () => {
    setSearchInput("");
    dispatch({ type: IAppActionType.RESET_CANDIDATES });
  };

  // remove candidate
  const handleRemoveCandidate = (id: string) => {
    dispatch({
      type: IAppActionType.REMOVE_CANDIDATE,
      payload: { _TYPE: IAppActionType.REMOVE_CANDIDATE, id },
    });
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
    setEditCandidate(false);
  };

  // add candidate into the list
  const handleAddCandidate = (candidate: Candidate) => {
    dispatch({
      type: IAppActionType.ADD_CANDIDATE,
      payload: { _TYPE: IAppActionType.ADD_CANDIDATE, candidate },
    });
    handleResetCandidates();
    navigate("/");
  };

  // edit candidate from the list
  const handleEditCandidate = (candidate: Candidate) => {
    dispatch({
      type: IAppActionType.EDIT_CANDIDATE,
      payload: { _TYPE: IAppActionType.EDIT_CANDIDATE, candidate },
    });
    navigate("/");
    setEditCandidate(false);
  };

  return (
    <CandidatesListContextProvider>
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
        <Copyright copyrightLabel="Bogdan Bogdanovic" />
      </div>
    </CandidatesListContextProvider>
  );
};

export default App;
