import React from "react";

export const Container = ({ children, className }) => {
  return <div className={`container px-4` + " " + className}>{children}</div>;
};
