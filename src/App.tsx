import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Fallback from "./components/Fallback";
import HomePage from "./routes";
import ErrorPage from "./routes/ErrorPage";
import RootLayout from "./routes/RootLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Fallback />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: "new-candidate",
            lazy: () => import("./routes/new-candidate"),
          },
          {
            path: "edit-candidate",
            lazy: () => import("./routes/edit-candidate"),
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
