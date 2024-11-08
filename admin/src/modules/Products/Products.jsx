import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import {
  getProductError,
  getProductPending,
  getProductSuccess,
} from "../../Toolkit/ProductsSlicer";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Products = () => {
  const dispatch = useDispatch();
  const { data, isPending, isError } = useSelector((state) => state.products);

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const getAllProducts = async () => {
      dispatch(getProductPending());
      try {
        const response = await Axios.get(`product`, {
          params: { pageNum, pageSize },
        });

        dispatch(getProductSuccess(response.data?.data || []));
        setTotalProducts(response.data?.total || 0);
      } catch (error) {
        dispatch(
          getProductError(error.response?.data?.message || "Unknown error")
        );
      }
    };
    getAllProducts();
  }, [dispatch, pageNum, pageSize]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await Axios.delete(`product/${id}`);
      dispatch(getProductSuccess(data.filter((product) => product._id !== id)));
      alert("Product deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <div className="p-8 bg-green-100 max-h-screen overflow-y-auto">
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-3xl text-black">Products</h1>
        <Link
          to={"/create-product"}
          className="bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors"
        >
          Create Product
        </Link>
      </div>

      {isPending ? (
        <table className="w-full">
          <tbody>
            <tr className="bg-gray-500 animate-pulse">
              <td className="py-3 px-6 border-b border-gray-800">
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
              </td>
              <td className="py-3 px-6 border-b border-gray-800">
                <div className="w-24 h-4 bg-gray-600 rounded"></div>
              </td>
              <td className="py-3 px-6 border-b border-gray-800">
                <div className="w-32 h-4 bg-gray-600 rounded"></div>
              </td>
              <td className="py-3 px-4 border-b border-gray-800 text-center">
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : isError ? (
        <p className="text-red-500 text-center text-xl">Error: {isError}</p>
      ) : data.length > 0 ? (
        <>
          <table className="min-w-full bg-green-800 text-black shadow-lg">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Image
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Product Name
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-700">
                  Price
                </th>
                <th className="py-3 px-4 text-center border-b border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-800">
              {data.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-green-700 transition-colors text-white"
                >
                  <td className="py-1 px-6 border-b border-gray-800">
                    <img
                      src={
                        product.photos[0] || "https://via.placeholder.com/100"
                      }
                      alt="Product"
                      className="w-10 h-10 mt-1 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-1 px-6 border-b border-gray-800">
                    {product.title}
                  </td>
                  <td className="py-1 px-6 border-b border-gray-800">
                    ${product.price}
                  </td>
                  <td className="py-1 px-4 border-b border-gray-800 text-center ">
                    <div className="flex justify-center items-center gap-5">
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="bg-sky-600 text-white rounded-md p-1 hover:bg-sky-700"
                      >
                        <Pencil className="text-white text-xs" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white rounded-md p-1 hover:bg-red-700"
                      >
                        <Trash2 className="text-white text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
              disabled={pageNum === 1}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {pageNum} of {totalPages}
            </span>
            <button
              onClick={() =>
                setPageNum((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={pageNum === totalPages}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          No products found.
        </p>
      )}
    </div>
  );
};
