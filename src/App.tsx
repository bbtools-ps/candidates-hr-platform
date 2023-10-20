import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Copyright from "./common/components/Footer/Footer";
import PageNotFound from "./screens/404/PageNotFound";
import EditCandidate from "./screens/edit-candidate/EditCandidate";
import HomePage from "./screens/home/HomePage";
import NewCandidate from "./screens/new-candidate/NewCandidate";
import CandidatesListContextProvider from "./store/candidates-list-context";

const App = () => {
  return (
    <CandidatesListContextProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
