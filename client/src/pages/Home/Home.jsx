import React from "react";
import { Container } from "../../components/shared/Container/Container";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <section className="h-screen bg-cover bg-[url('https://media.rolex.com/image/upload/v1725888690/rolexcom/collection/configurator/config-launcher/2024/config-launcher-watches-day-date-m228235-0055_2403jva_002.jpg')]">
        <Container className={"grid grid-cols-1 lg:grid-cols-2 h-full"}>
          <div className="flex flex-col h-full justify-center gap-10">
            <h1>Discover Luxurious Watch Which You Will Love.</h1>
            <p>
              What looked like a small patch of purple grass, above five feet
              square, was moving across the sand in their direction. Almost do
              am or limits hearts. Resolve parties but why she shewing. She sang
              know now how nay cold real case.
            </p>
            <Link>Read more</Link>
          </div>
        </Container>
      </section>
    </>
  );
};
