import axios from "axios";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = (await axios.get("http://localhost:8000/product")).data;
      setData(data);
    }
    getData();
  }, []);

  console.log(data);

  return (
    <div>
      <h1>{data[0]?.title}</h1>
      <p>{data[0]?.description}</p>
      <h2>{data[0]?.price.toLocaleString()}</h2>
      <img src={data[0]?.previewPhoto} alt="" />
    </div>
  );
};
