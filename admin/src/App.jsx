import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./Layout/RootLayout";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Admins } from "./Pages/Admins/Admins";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "admins",
          element: <Admins />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
