import { useEffect, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Copyright from "./common/components/Footer/Footer";
import { DUMMY_CANDIDATES } from "./data/data";
import PageNotFound from "./screens/404/PageNotFound";
import EditCandidate from "./screens/edit-candidate/EditCandidate";
import HomePage from "./screens/home/HomePage";
import NewCandidate from "./screens/new-candidate/NewCandidate";
import { useCandidatesStore } from "./store/candidates";
import CandidatesListContextProvider from "./store/candidates-list-context";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setCandidates } = useCandidatesStore();

  useEffect(() => {
    setCandidates(DUMMY_CANDIDATES);
    setIsLoading(false);
  }, [setCandidates]);

  return (
    <CandidatesListContextProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage isLoading={isLoading} />} />
          <Route path="/new-candidate" element={<NewCandidate />} />
          <Route path="/edit-candidate" element={<EditCandidate />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Copyright copyrightLabel="Bogdan Bogdanovic" />
      </div>
    </CandidatesListContextProvider>
  );
};

export default App;
