import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import { Section } from "../../Components/Section/Section";

export const UserUpdate = () => {
  const { data } = useSelector((state) => state.user);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    avatar: data.avatar,
    phoneNumber: data.phoneNumber,
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.put(`admin/${id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: formData.avatar,
        phoneNumber: formData.phoneNumber,
        password: formData.newPassword,
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Section
      className={"bg-green-100 flex flex-col justify-center items-center"}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[400px] flex flex-col gap-3 p-5 bg-white rounded-2xl shadow-xl"
      >
        <h1 className="text-center text-2xl font-bold">Update Admin</h1>
        <input
          className="p-2 outline-none border-2 border-black rounded-2xl"
          type="text"
          placeholder="Firstname"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          className="p-2 outline-none border-2 border-black rounded-2xl"
          type="text"
          placeholder="Lastname"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <input
          className="p-2 outline-none border-2 border-black rounded-2xl"
          type="number"
          placeholder="Phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          className="p-2 outline-none border-2 border-black rounded-2xl"
          type="password"
          placeholder="New password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
        />
        <div className="grid grid-cols-2 py-2 gap-3">
          <Link
            to="/"
            className="bg-black rounded-2xl flex justify-center text-white py-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-600 rounded-2xl text-white py-2"
          >
            Save
          </button>
        </div>
      </form>
    </Section>
  );
};
