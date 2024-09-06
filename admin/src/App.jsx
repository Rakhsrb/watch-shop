import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./Layout/RootLayout";
import Axios from "./Axios";
import {
  getUserError,
  getUserPending,
  getUserSuccess,
} from "./Toolkit/UserSlicer";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./Pages/Loading/Loading";
import { Login } from "./Pages/Auth/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const { isAuth, isPending, data } = useSelector((state) => state.user);

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(getUserPending());

        const response = (await Axios.get("admin/me")).data;
        if (response.data) {
          dispatch(getUserSuccess(response.data));
        }
      } catch (error) {
        dispatch(getUserError(error.response.data || "Unknown Token"));
      }
    }
    getMyData();
  }, [dispatch]);

  console.log(data);

  const router = createBrowserRouter(
    isPending
      ? [
          {
            path: "/",
            element: <Loading />,
          },
        ]
      : isAuth
      ? [
          {
            path: "/",
            element: <RootLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
            ],
          },
        ]
      : [
          {
            path: "/",
            element: <Login />,
          },
        ]
  );

  return <RouterProvider router={router} />;
}

export default App;
