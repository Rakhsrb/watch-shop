import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="bg-green-900 h-screen">
      <ul className="h-full flex flex-col">
        <li>
          <NavLink
            to={"/"}
            className="flex text-xl text-yellow-500 p-5"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admins"}
            className="flex text-xl text-yellow-500 p-5"
          >
            Admins
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
