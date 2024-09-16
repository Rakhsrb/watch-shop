import React, { useEffect, useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    colors: "",
    photos: [],
  });

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState("");
  const [imagePending, setImagePending] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsPending(true);
        const { data } = (await Axios.get(`product/${id}`)).data;
        setProductData(data);
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
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append("photos", files[i]);
      }
      setImagePending(true);
      const { data } = await Axios.post("/upload", formImageData);
      setProductData((prevData) => ({
        ...prevData,
        photos: data.photos,
      }));
      setImagePending(false);
    } catch (err) {
      setImagePending(false);
      console.log(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(`/product/${id}`, {
        title: productData.title,
        description: productData.description,
        price: +productData.price,
        stock: +productData.stock,
        category: productData.category,
        colors: productData.colors,
        photos: productData.photos,
      });
      navigate("/products");
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Section>
      {isPending && <p>Loading...</p>}
      {isError && <p className="text-red-500">{isError}</p>}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-4 w-full mx-auto mt-14 md:w-[500px]"
      >
        <h1 className="text-4xl text-center">Edit Product</h1>
        <input
          type="text"
          name="title"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          value={productData.title || ""}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          value={productData.description || ""}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          value={productData.price || ""}
          placeholder="Price"
        />
        <input
          type="number"
          name="stock"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={productData.stock || ""}
          onChange={handleInputChange}
          placeholder="Stock"
        />
        <div className="grid grid-cols-2 gap-3 w-full">
          <select
            name="category"
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={productData.category || ""}
            onChange={handleInputChange}
          >
            <option value="none">Select Category</option>
            <option value="sport">Sport</option>
            <option value="classic">Classic</option>
            <option value="casual">Casual</option>
            <option value="manual">Manual</option>
          </select>
          <select
            name="colors"
            className="border border-gray-300 rounded-md p-2 bg-white"
            onChange={handleInputChange}
            value={productData.colors || ""}
          >
            <option value="none">Select Color</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="black">black</option>
          </select>
        </div>
        <input
          type="file"
          name="photos"
          onChange={handleFileChange}
          multiple
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        {imagePending && (
          <h1 className="bg-sky-600 text-white text-center py-2">
            Uploading image...
          </h1>
        )}
        <button
          type="submit"
          disabled={imagePending}
          className={`${
            imagePending ? "bg-green-600 cursor-not-allowed" : "bg-green-700"
          } w-full text-xl py-2 rounded-md text-white`}
        >
          {imagePending ? "Loading..." : "Submit"}
        </button>
      </form>
    </Section>
  );
};
