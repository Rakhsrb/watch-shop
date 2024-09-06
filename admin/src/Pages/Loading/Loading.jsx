import React from "react";
import { ScaleLoader } from "react-spinners";

export const Loading = () => {
  return (
    <>
      <section className="h-screen bg-green-800">
        <div className="container flex flex-col h-full items-center justify-center gap-3">
          <ScaleLoader color="#fff" />
          <h1 className="text-[#fff] font-semibold">Yuklanmoqda...</h1>
        </div>
      </section>
    </>
  );
};
