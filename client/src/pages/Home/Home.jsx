import React from "react";
import { Container } from "../../components/shared/Container/Container";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

export const Home = () => {
  return (
    <>
      <section className="h-screen hero_bg">
        <Container
          className={
            "grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12"
          }
        >
          <div className="flex flex-col h-full justify-center items-start gap-10">
            <h1 className="text-white text-6xl font-bold">
              Discover Luxurious Watch Which You Will Love.
            </h1>
            <p className="text-[#B1B1B1] font-light">
              What looked like a small patch of purple grass, above five feet
              square, was moving across the sand in their direction. Almost do
              am or limits hearts. Resolve parties but why she shewing. She sang
              know now how nay cold real case.
            </p>
            <Link className="text-[#9A836C] border-2 border-[#9A836C] text-2xl py-3 px-4 flex items-center justify-center gap-4">
              Read more
              <ArrowRight />
            </Link>
          </div>
        </Container>
      </section>
      <section className="py-20 bg-[#1B1D22]">
        <Container>
          <h1 className="mb-10 text-white text-3xl">New Watches</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-white">
              <figure className="w-full overflow-hidden">
                <img
                  className="w-full object-cover"
                  src="https://magazine.chrono24.com/cdn-cgi/image/f=auto,metadata=none,fit=cover,q=65,w=1190,h=595,dpr=2.0/2023/01/Omega-2-1-1.jpg"
                  alt=""
                />
              </figure>
              <h3 className="">Thermo Ball Etip Gloves</h3>
              <h2>$ 45,743</h2>
            </div>
            <div className="text-white">
              <figure className="w-full overflow-hidden">
                <img
                  className="w-full object-cover"
                  src="https://magazine.chrono24.com/cdn-cgi/image/f=auto,metadata=none,fit=cover,q=65,w=1190,h=595,dpr=2.0/2023/01/Omega-2-1-1.jpg"
                  alt=""
                />
              </figure>
              <h3 className="">Thermo Ball Etip Gloves</h3>
              <h2>$ 45,743</h2>
            </div>
            <div className="text-white">
              <figure className="w-full overflow-hidden">
                <img
                  className="w-full object-cover"
                  src="https://magazine.chrono24.com/cdn-cgi/image/f=auto,metadata=none,fit=cover,q=65,w=1190,h=595,dpr=2.0/2023/01/Omega-2-1-1.jpg"
                  alt=""
                />
              </figure>
              <h3 className="">Thermo Ball Etip Gloves</h3>
              <h2>$ 45,743</h2>
            </div>
          </div>
          <div className="flex items-center justify-center my-20">
            <button className="">View more</button>
          </div>
        </Container>
      </section>
    </>
  );
};
