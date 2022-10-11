import React from "react";
import { useSelector } from "react-redux";

import Loader from "../components/Loader";
import Header from "../components/Header";
import Products from "../components/Products";
import NavMenu from "../components/NavMenu";

const Homepage = () => {
  const { loading } = useSelector((state) => state.user);
  const { toggleMenu } = useSelector((state) => state.toggle);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : toggleMenu ? (
        <NavMenu />
      ) : (
        <>
          <Header />
          <Products />
        </>
      )}
    </>
  );
};

export default Homepage;
