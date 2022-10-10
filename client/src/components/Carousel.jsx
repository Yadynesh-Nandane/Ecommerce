/* eslint-disable react/prop-types */
import React from "react";

const Carousel = ({ images }) => {
  return (
    <>
      {images?.map((image, i) => (
        <>
          <img key={i} src={image} alt="" />
        </>
      ))}
    </>
  );
};

export default Carousel;
