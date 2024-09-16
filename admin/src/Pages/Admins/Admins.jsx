import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
} from "../../Toolkit/AdminsSlicer";
import { Pencil, Trash2 } from "lucide-react";

export const Admins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isPending, isError } = useSelector((state) => state.admins);

  useEffect(() => {
    const getAllAdmins = async () => {
      dispatch(getAdminsPending());
      try {
        const response = await Axios.get("admin");
        dispatch(getAdminsSuccess(response.data?.data || []));
      } catch (error) {
        dispatch(
          getAdminsError(error.response?.data?.message || "Unknown error")
        );
      }
    };
    getAllAdmins();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await Axios.delete(`admin/${id}`);
      dispatch(getAdminsSuccess(data.filter((admin) => admin._id !== id)));
      alert("Admin deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete admin");
    }
  };

  return (
    <div className="p-8 bg-green-100 max-h-screen overflow-y-auto">
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-3xl text-black">Admins</h1>
        <button
          onClick={() => navigate("/create-admin")}
          className="bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors"
        >
          Create Admin
        </button>
      </div>

      {isPending ? (
        <table width={"100%"}>
          <tbody>
            {Array.from({ length: 1 }).map((_, index) => (
              <tr key={index} className="bg-gray-500 animate-pulse">
                <td className="py-3 px-6 border-b border-green-800">
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                </td>
                <td className="py-3 px-6 border-b border-green-800">
                  <div className="w-24 h-4 bg-gray-600 rounded"></div>
                </td>
                <td className="py-3 px-6 border-b border-green-800">
                  <div className="w-24 h-4 bg-gray-600 rounded"></div>
                </td>
                <td className="py-3 px-6 border-b border-green-800">
                  <div className="w-32 h-4 bg-gray-600 rounded"></div>
                </td>
                <td className="py-3 px-4 border-b border-green-800 text-center">
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : isError ? (
        <p className="text-red-500 text-center text-xl">Error: {isError}</p>
      ) : data.length > 0 ? (
        <table className="min-w-full bg-green-900 text-white shadow-lg">
          <thead className="bg-green-800">
            <tr>
              <th className="py-3 px-6 text-left border-b border-green-700">
                Avatar
              </th>
              <th className="py-3 px-6 text-left border-b border-green-700">
                First Name
              </th>
              <th className="py-3 px-6 text-left border-b border-green-700">
                Last Name
              </th>
              <th className="py-3 px-4 text-left border-b border-green-700">
                Phone Number
              </th>
              <th className="py-3 px-4 text-center border-b border-green-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-800">
            {data.map((admin) => (
              <tr
                key={admin._id}
                className="hover:bg-green-700 transition-colors"
              >
                <td className="py-1 px-6 border-b border-green-800">
                  <img
                    src={
                      admin.avatar ||
                      "https://st3.depositphotos.com/5852012/15878/v/450/depositphotos_158781058-stock-illustration-photo-gallery-flat-icon-with.jpg"
                    }
                    alt="Avatar"
                    className="w-10 h-10 mt-1 rounded-full object-cover"
                  />
                </td>
                <td className="py-1 px-6 border-b border-green-800">
                  {admin.firstName}
                </td>
                <td className="py-1 px-6 border-b border-green-800">
                  {admin.lastName}
                </td>
                <td className="py-1 px-6 border-b border-green-800">
                  {admin.phoneNumber}
                </td>
                <td className="py-1 px-4 border-b border-green-800 text-center">
                  <div className="flex justify-center items-center gap-5">
                    <Link
                      to={`/edit-admin/${admin._id}`}
                      className="bg-sky-600 text-white rounded-md p-1 hover:bg-sky-700"
                    >
                      <Pencil className="text-white text-xs" />
                    </Link>
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="bg-white rounded-md p-1"
                    >
                      <Trash2 className="text-green-600 text-xs hover:text-green-800 cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          No admins found.
        </p>
      )}
    </div>
  );
};
