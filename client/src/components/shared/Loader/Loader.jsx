import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div class="loader ">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  );
};

export default Loader;
