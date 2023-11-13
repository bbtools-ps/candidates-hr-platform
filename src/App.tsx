import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Copyright from "./common/components/Footer/Footer";
import Loading from "./common/components/Loading/Loading";
import { DUMMY_CANDIDATES } from "./data/data";

import { useCandidatesStore } from "./store/candidates";
import CandidatesListContextProvider from "./store/candidates-list-context";

const HomePage = lazy(() => import("./screens/home/HomePage"));
const NewCandidate = lazy(() => import("./screens/new-candidate/NewCandidate"));
const EditCandidate = lazy(
  () => import("./screens/edit-candidate/EditCandidate")
);
const PageNotFound = lazy(() => import("./screens/404/PageNotFound"));

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
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage isLoading={isLoading} />
              </Suspense>
            }
          >
            <Route
              path="/new-candidate"
              element={
                <Suspense fallback={<Loading />}>
                  <NewCandidate />
                </Suspense>
              }
            />
            <Route
              path="/edit-candidate"
              element={
                <Suspense fallback={<Loading />}>
                  <EditCandidate />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
        <Copyright copyrightLabel="Bogdan Bogdanovic" />
      </div>
    </CandidatesListContextProvider>
  );
};

export default App;
