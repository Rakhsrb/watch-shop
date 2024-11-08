import React from "react";
import { Container } from "../../components/shared/Container/Container";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

export const Hero = () => {
  return (
    <section className="h-screen hero_bg">
      <Container
        className={"grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12"}
      >
        <div className="flex flex-col h-full justify-center items-start gap-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Discover Luxurious Watch Which You Will Love.
          </h1>
          <p className="text-[#B1B1B1] text-[12px] md:text-[14px] font-light">
            What looked like a small patch of purple grass, above five feet
            square, was moving across the sand in their direction. Almost do am
            or limits hearts. Resolve parties but why she shewing. She sang know
            now how nay cold real case.
          </p>
          <Link className="text-[#9A836C] border-2 border-[#9A836C] text-xl md:text-2xl py-3 px-4 flex items-center justify-center gap-4">
            Read more
            <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
};
