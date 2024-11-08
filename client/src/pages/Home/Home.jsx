import React from "react";
import { NewProducts } from "../../modules/NewProducts/NewProducts";
import { Hero } from "../../modules/Hero/Hero";

export const Home = () => {
  return (
    <>
      <Hero />
      <NewProducts />
    </>
  );
};
