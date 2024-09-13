import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";

export const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    colors: [],
    photos: [],
  });

  const ranglar = [
    {
      hash: "#181C14",
      name: "Dark Green",
    },
    {
      hash: "#697565",
      name: "Olive Green",
    },
    {
      hash: "#654520",
      name: "Brown",
    },
    {
      hash: "#00712D",
      name: "Green",
    },
    {
      hash: "#D8A25E",
      name: "Light Brown",
    },
  ];

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
      const { data } = await Axios.post("/upload", formImageData);
      setProductData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...data.photos],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/product/create", {
        title: productData.title,
        description: productData.description,
        price: +productData.price,
        stock: +productData.stock,
        category: productData.category,
        colors: productData.colors,
        photos: productData.photos,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
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
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="stock"
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={handleInputChange}
          placeholder="Stock"
        />
        <div className="grid grid-cols-2 gap-3 w-full">
          <select
            name="category"
            className="border border-gray-300 rounded-md p-2 bg-white"
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
