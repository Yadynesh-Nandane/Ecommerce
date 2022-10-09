import React from "react";

import loading from "../assets/loading.svg";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img src={loading} alt="Loading image" />
    </div>
  );
};

export default Loader;
