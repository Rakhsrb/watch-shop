import React from "react";
import { Header } from "../components/shared/Header/Header";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
