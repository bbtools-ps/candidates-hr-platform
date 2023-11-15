import { Suspense, lazy } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Loading from "./common/components/Loading/Loading";
import RootLayout from "./routes/RootLayout";
import CandidatesListContextProvider from "./store/candidates-list-context";

const HomePage = lazy(() => import("./routes/home/HomePage"));
const NewCandidate = lazy(() => import("./routes/new-candidate/NewCandidate"));
const EditCandidate = lazy(
  () => import("./routes/edit-candidate/EditCandidate")
);
const PageNotFound = lazy(() => import("./routes/404/PageNotFound"));

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <Suspense fallback={<Loading />}>
        <PageNotFound />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
        children: [
          {
            path: "/new-candidate",
            element: (
              <Suspense fallback={<Loading />}>
                <NewCandidate />
              </Suspense>
            ),
          },
          {
            path: "/edit-candidate",
            element: (
              <Suspense fallback={<Loading />}>
                <EditCandidate />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <CandidatesListContextProvider>
      <RouterProvider router={router} />
    </CandidatesListContextProvider>
  );
};

export default App;
