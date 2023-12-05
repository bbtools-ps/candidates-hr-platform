import { RouterProvider, createHashRouter } from "react-router-dom";
import HomePage from "./routes";
import ErrorPage from "./routes/ErrorPage";
import RootLayout from "./routes/RootLayout";

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
            lazy: () => import("./routes/edit-candidate"),
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
