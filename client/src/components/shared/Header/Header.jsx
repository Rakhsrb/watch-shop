import React, { useEffect, useState, useRef } from "react";
import { Container } from "../Container/Container";
import { Link } from "react-router-dom";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import "./Header.css";

export const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const navMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  document.body.style.overflowY = navActive ? "hidden" : "auto";

  useEffect(() => {
    ё;
    document.addEventListener("click", (e) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setNavActive(false);
      }
    });
  }, []);

  return (
    <header className="h-[80px] fixed w-full left-0 top-0">
      <Container className={"h-full flex justify-between items-center"}>
        <Link to={"/"}>
          <img
            className="w-[80px]"
            src="https://cdn.freebiesupply.com/logos/large/2x/rolex-1-logo-black-and-white.png"
            alt="Logo"
          />
        </Link>
        <ul
          ref={navMenuRef}
          className={`flex gap-5 font-semibold text-white nav-menu ${
            navActive ? "active" : ""
          }`}
        >
          <li>
            <a href="#watches">Watches</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
        </ul>
        <div className="flex items-center gap-4 text-white">
          <Link to={"/cart"} className="font-bold">
            <ShoppingBag size={25} />
          </Link>
          <div className="handleNav">
            {navActive ? (
              <X
                ref={toggleButtonRef}
                size={25}
                onClick={() => setNavActive(false)}
              />
            ) : (
              <List
                ref={toggleButtonRef}
                size={25}
                onClick={(e) => {
                  e.stopPropagation();
                  setNavActive(true);
                }}
              />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
