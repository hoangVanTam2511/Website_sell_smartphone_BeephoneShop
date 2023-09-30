import React from "react";
import logo from "./logo.png";
// import { stepClasses } from '@mui/material'
const Logo = (props) => {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{ width: 150, transform: `translateX(${20}px)` }}
    />
  );
};

export default Logo;
