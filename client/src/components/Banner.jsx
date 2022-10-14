import React from "react";
import { CgMouse } from "react-icons/cg";

const Banner = () => {
  return (
    <>
      <div className="bg-[#131921] min-h-[700px] mt-[100px] flex flex-col items-center content-center text-white">
        <p className="font-light text-base">Welcome to AMAZON</p>
        <h1 className="my-3 font-semibold text-lg">
          FIND AMAZING PRODUCTS BELOW
        </h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
    </>
  );
};

export default Banner;
