import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "../../Axios";
import { Section } from "../../Components/Section/Section";

export const UserUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    newPassword: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsPending(true);
        const { data } = (await Axios.get(`admin/${id}`)).data;
        for (const key in data) {
          setUserData((prev) => ({ ...prev, [key]: data[key] }));
        }
      } catch (error) {
        setIsError(error.response?.data?.message || "An error occurred.");
      } finally {
        setIsPending(false);
      }
    };
    getProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.put(`admin/${id}`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        phoneNumber: userData.phoneNumber,
        password: userData.newPassword,
      });
      navigate("/admins");
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
          value={userData.firstName}
          onChange={handleInputChange}
        />
        <input
          className="p-2 outline-none border-2 border-black rounded-2xl"
          type="text"
          placeholder="Lastname"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
        />
        <input
          className="p-2 outline-none border-2 border-black rounded-2xl"
          type="number"
          placeholder="Phone number"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          className="p-2 outline-none border-2 border-black rounded-2xl"
          type="password"
          placeholder="New password"
          name="newPassword"
          value={userData.newPassword}
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
