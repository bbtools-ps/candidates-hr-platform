import { Suspense, lazy } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Loading from "./common/components/Loading/Loading";
import RootLayout from "./routes/RootLayout";
import ErrorPage from "./routes/error/ErrorPage";

const HomePage = lazy(() => import("./routes"));
const NewCandidate = lazy(() => import("./routes/new-candidate"));
const EditCandidate = lazy(() => import("./routes/edit-candidate"));

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
  return <RouterProvider router={router} />;
};

export default App;
