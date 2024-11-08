import React, { useEffect } from "react";
import { Home } from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isAuth, isPending, data } = useSelector((state) => state.client);

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(getClientPending());
        const response = (await Axios.get("admin/me")).data;

        if (response.data) {
          dispatch(getClientSuccess(response.data));
        } else {
          dispatch(getClientError("No user data available"));
        }
      } catch (error) {
        dispatch(getClientError(error.response?.data || "Unknown Token"));
      }
    }
    getMyData();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
