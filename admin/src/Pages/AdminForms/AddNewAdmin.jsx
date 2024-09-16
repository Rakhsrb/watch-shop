import React, { useState } from "react";
import Axios from "../../Axios";
import { Section } from "../../Components/Section/Section";
import { Eye, EyeOff } from "lucide-react";

export const AddNewAdmin = () => {
  const [error, setError] = useState("");
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/admin/create", adminData);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Section>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-4 w-full mx-auto mt-14 md:w-[500px]"
      >
        <h1 className="text-4xl text-center">New Admin</h1>
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <label htmlFor="phoneNumber" className="sr-only">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Phone Number"
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleInputChange}
            placeholder="Password"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-green-700 w-full text-xl py-2 rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </Section>
  );
};
