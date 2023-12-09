import React from "react";
import logo from "./logo.png";
// import { stepClasses } from '@mui/material'
const Logo = (props) => {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{ width: "150px", transform: `translateX(${20}px)`, height: "35px" }}
    />
  );
};

export default Logo;
