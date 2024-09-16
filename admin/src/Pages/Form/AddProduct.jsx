import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [imagePending, setImagePending] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    colors: [],
    photos: [],
  });

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
        photos: [...prevData.photos, ...data.photos],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setImagePending(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const response = await Axios.post("/product/create", {
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
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Section>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-4 w-full mx-auto mt-14 md:w-[500px]"
      >
        <h1 className="text-4xl text-center">New Product</h1>
        <input
          type="text"
          name="title"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          required
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          required
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          required
          placeholder="Price"
        />
        <input
          type="number"
          name="stock"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          required
          placeholder="Stock"
        />
        <div className="grid grid-cols-2 gap-3 w-full">
          <select
            name="category"
            className="border border-gray-300 rounded-md p-2 bg-white"
            onChange={handleInputChange}
            required
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
            required
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
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        {imagePending && (
          <h1 className="bg-sky-600 text-white text-center py-2">
            Uploading image...
          </h1>
        )}
        <button
          type="submit"
          disabled={imagePending || isPending}
          className={`${
            imagePending || isPending
              ? "bg-green-600 cursor-not-allowed"
              : "bg-green-700"
          } w-full text-xl py-2 rounded-md text-white`}
        >
          {imagePending || isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </Section>
  );
};
