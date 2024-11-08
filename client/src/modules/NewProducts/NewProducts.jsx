import React from "react";
import { Container } from "../../components/shared/Container/Container";

export const NewProducts = () => {
  return (
    <section id="watches" className="py-20 bg-zinc-900">
      <Container>
        <h1 className="mb-5 text-white text-3xl text-center uppercase">
          New Watches
        </h1>
        <h3 className="mb-10 text-stone-400 text-sm font-light text-center">
          The thing which everyone have to buy it
        </h3>
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
        </div>
        <div className="flex items-center justify-center my-20">
          <button className="">View more</button>
        </div>
      </Container>
    </section>
  );
};
