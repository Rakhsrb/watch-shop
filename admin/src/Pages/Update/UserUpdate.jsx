import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import { Section } from "../../Components/Section/Section";

export const UserUpdate = () => {
  const { data } = useSelector((state) => state.user);
  const { id } = useParams();
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, password: "" }));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
    const uploadData = new FormData();
    uploadData.append("avatar", formData.avatar);
    try {
      const { data } = await Axios.post("upload", uploadData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = Axios.put("admin/" + id, formData);
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
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input type="file" name="avatar" onChange={handleFileChange} />
        <div className="grid grid-cols-2 py-2 gap-3">
          <button
            type="button"
            className="bg-black rounded-2xl text-white py-2"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
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
