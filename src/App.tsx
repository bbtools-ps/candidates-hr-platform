import { RouterProvider, createHashRouter } from "react-router-dom";
import HomePage from "./routes";
import RootLayout from "./routes/RootLayout";
import ErrorPage from "./routes/error/ErrorPage";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
            lazy: () => import("./routes/new-candidate"),
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
