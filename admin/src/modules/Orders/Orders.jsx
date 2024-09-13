import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersError,
  getOrdersPending,
  getOrdersSuccess,
} from "../../Toolkit/OrdersSlicer";
import { Trash2 } from "lucide-react";

export const Orders = () => {
  const dispatch = useDispatch();
  const { data, isPending, isError } = useSelector((state) => state.orders);

  useEffect(() => {
    const getAllOrders = async () => {
      dispatch(getOrdersPending());
      try {
        const { data } = await Axios.get("order").data;
        dispatch(getOrdersSuccess(data));
      } catch (error) {
        dispatch(getOrdersError(error.response?.data?.message));
      }
    };
    getAllOrders();
  }, [dispatch]);

  return (
    <div>
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
                    src={admin.avatar}
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
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-white rounded-md p-1"
                  >
                    <Trash2 className="text-green-600 text-xs hover:text-green-800 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          No orders found.
        </p>
      )}
    </div>
  );
};
