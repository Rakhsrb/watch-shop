import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogOut, Pencil } from "lucide-react";
import Cookies from "js-cookie";
import { Section } from "../../Components/Section/Section";

export const Dashboard = () => {
  const { data } = useSelector((state) => state.user);
  const { avatar, firstName, lastName, phoneNumber, _id } = data;

  function Logout() {
    Cookies.remove("token");
    window.location.href = "/";
  }

  return (
    <Section className={"flex items-center justify-center flex-col gap-3"}>
      <img src={avatar} width={"150px"} alt="" />
      <h3 className="text-2xl font-bold">{firstName + " " + lastName}</h3>
      <a className="hover:underline text-2xl" href={`tel: +998${phoneNumber}`}>
        +998 {phoneNumber}
      </a>
      <div className="flex gap-4">
        <Link
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl font-bold"
          to={"/edit-admin/" + _id}
        >
          Edit
          <Pencil size={14} />
        </Link>
        <button
          onClick={() => Logout()}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-2xl font-bold"
        >
          Logout <LogOut size={14} />
        </button>
      </div>
    </Section>
  );
};
