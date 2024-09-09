import React from "react";
import { ClockLoader } from "react-spinners";

export const Loading = () => {
  return (
    <>
      <section className="h-screen bg-green-800">
        <div className="container flex flex-col h-full items-center justify-center gap-3">
          <ClockLoader color="#ffffff" size={50} />
        </div>
      </section>
    </>
  );
};
