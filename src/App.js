import { useReducer, useState } from "react";
import Logo from "./components/UI/Logo";
import MainMenu from "./components/MainMenu";
import NewCandidate from "./components/Candidate/NewCandidate";
import EditCandidate from "./components/Candidate/EditCandidate";
import CandidatesList from "./components/CandidatesList/CandidatesList";
import Copyright from "./components/Copyright/Copyright";
import "./App.css";

const INITIAL_VALUES = {
  allCandidates: [
    {
      name: "Maggie Frank",
      dateOfBirth: "12.3.1990.",
      contactNumber: "+381662312123",
      email: "maggie.frank@gmail.com",
      skills: "PHP, MySql",
      id: "1",
    },
    {
      name: "Ruby Elliott",
      dateOfBirth: "18.6.1995.",
      contactNumber: "+381662312123",
      email: "ruby.elliott@gmail.com",
      skills: "Adobe Photoshop, Adobe XD",
      id: "2",
    },
    {
      name: "Raphael Ward",
      dateOfBirth: "15.5.1989.",
      contactNumber: "+381662312123",
      email: "raphael.ward@gmail.com",
      skills: "Adobe Illustrator",
      id: "3",
    },
    {
      name: "Robbie Waters",
      dateOfBirth: "31.12.1992",
      contactNumber: "+381662312123",
      email: "robbie.waters@gmail.com",
      skills: "HTML, CSS",
      id: "4",
    },
    {
      name: "Liam Kirk",
      dateOfBirth: "7.8.1990",
      contactNumber: "+381662312123",
      email: "liam.kirk@gmail.com",
      skills: "JavaScript",
      id: "5",
    },
    {
      name: "Rob Frank",
      dateOfBirth: "19.5.1985",
      contactNumber: "+381662312123",
      email: "rob.frank@gmail.com",
      skills: "HTML, CSS, JavaScript",
      id: "6",
    },
  ],
  showAddCandidate: false,
  showEditCandidate: false,
  filteredCandidates: [],
};

// initially copy all values from "allCandidates" to "filteredCandidates" array
INITIAL_VALUES.filteredCandidates = [...INITIAL_VALUES.allCandidates];

const candidatesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CANDIDATE":
      return {
        ...state,
        allCandidates: [action.candidate, ...state.allCandidates],
        filteredCandidates: [action.candidate, ...state.allCandidates],
      };
    case "EDIT_CANDIDATE":
      const editedCandidates = state.allCandidates.map((candidate) => {
        return candidate.id === action.candidate.id
          ? (candidate = action.candidate)
          : candidate;
      });
      return {
        ...state,
        allCandidates: editedCandidates,
        filteredCandidates: editedCandidates,
      };
    case "REMOVE_CANDIDATE":
      const removedCandidatesAll = state.allCandidates.filter((candidate) => {
        return candidate.id !== action.id;
      });
      const removedCandidatesFilter = state.filteredCandidates.filter(
        (candidate) => {
          return candidate.id !== action.id;
        }
      );
      return {
        ...state,
        allCandidates: removedCandidatesAll,
        filteredCandidates: removedCandidatesFilter,
      };
    case "FILTER_CANDIDATES":
      const filteredCandidates = state.filteredCandidates.filter(
        (candidate) => {
          return (
            action.searchTerm.test(candidate.name) ||
            action.searchTerm.test(candidate.skills)
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

function App() {
  const [candidates, dispatchCandidates] = useReducer(
    candidatesReducer,
    INITIAL_VALUES
  );
  const [selectedCandidate, setSelectedCandidate] = useState();

  // filter candidates based on their name, skills
  const filterCandidatesHandler = (filterValue) => {
    if (filterValue.trim() === "") {
      dispatchCandidates({ type: "RESET_CANDIDATES" });
    } else {
      // create array of search terms
      const searchTerms = filterValue.trim().split(" ");
      // loop through each search term
      searchTerms.forEach((term) => {
        // create regex for each search term
        const searchTerm = new RegExp(term, "i");
        dispatchCandidates({ type: "FILTER_CANDIDATES", searchTerm });
      });
    }
  };

  // reset candidates
  const resetCandidatesHandler = () => {
    dispatchCandidates({ type: "RESET_CANDIDATES" });
  };

  // remove candidate
  const removeCandidateHandler = (id) => {
    dispatchCandidates({ type: "REMOVE_CANDIDATE", id });
  };

  // show form for adding new candidate
  const addNewCandidateHandler = () => {
    dispatchCandidates({ type: "SHOW_ADD_CANDIDATE" });
  };

  // edit candidate
  const editCandidateHandler = (candidate) => {
    setSelectedCandidate(candidate);
    dispatchCandidates({ type: "SHOW_EDIT_CANDIDATE" });
  };

  // show all candidates when pressing "Cancel" on the form
  const cancelHandler = () => {
    dispatchCandidates({ type: "SHOW_ALL_CANDIDATES" });
  };

  // add candidate into the list
  const addHandler = (candidate) => {
    dispatchCandidates({ type: "ADD_CANDIDATE", candidate });
    dispatchCandidates({ type: "SHOW_ALL_CANDIDATES" });
  };

  // edit candidate from the list
  const editHandler = (candidate) => {
    dispatchCandidates({ type: "EDIT_CANDIDATE", candidate });
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
          candidateName={selectedCandidate.name}
          candidateDateOfBirth={selectedCandidate.dateOfBirth}
          candidateContactNumber={selectedCandidate.contactNumber}
          candidateEmail={selectedCandidate.email}
          candidateSkills={selectedCandidate.skills}
          candidateId={selectedCandidate.id}
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
}

export default App;
