/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

import { setToggleMenu } from "../features/toggleSlice";
import { navbarTrendings, categories } from "../data";

const NavMenu = () => {
  const dispatch = useDispatch();
  const { toggleMenu } = useSelector((state) => state.toggle);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const accountusername = user?.user?.name.split(" ");

  const handleToggleToFalse = () => {
    dispatch(setToggleMenu(false));
  };

  return (
    <>
      <div
        className={
          toggleMenu
            ? "w-full h-screen flex font-poppins absolute top-0 z-10"
            : "w-full h-screen flex font-poppins absolute top-0 z-0"
        }
      >
        <div className="flex flex-col w-4/5 lg:w-[350px] h-full bg-white">
          <div className="flex flex-col w-full h-auto py-5 bg-[#131921]">
            <div className="flex items-center justify-end lg:justify-start text-white">
              {!isAuthenticated ? (
                <Link to="/signin" className="flex pr-5 ml-5">
                  <BsPersonCircle
                    size={25}
                    className="hidden lg:flex lg:mr-2"
                  />
                  <div className="flex ml-1 lg:text-lg lg:font-semibold">
                    <span className="hidden lg:flex">Hello, </span>
                    <span>{"    "}</span>
                    <span className="flex lg:hidden">Sign in</span>
                    <span className="hidden lg:flex">sign in</span>
                  </div>
                  <AiOutlineUser size={25} className="flex ml-2 lg:hidden" />
                </Link>
              ) : (
                <Link
                  to="/account"
                  className="flex lg:h-full lg:w-full items-center lg:pl-5 pr-5"
                  onClick={handleToggleToFalse}
                >
                  <BsPersonCircle
                    size={25}
                    className="hidden lg:flex lg:mr-2"
                  />
                  <p>Hello, {accountusername[0]}</p>
                  <AiOutlineUser size={25} className="flex ml-2 lg:hidden" />
                </Link>
              )}
            </div>
            <Link
              to="/"
              className="flex flex-col items-start justify-start px-5 mt-4 text-white lg:hidden"
              onClick={handleToggleToFalse}
            >
              <span className="text-xl font-semibold">Browse</span>
              <span className="text-3xl">Amazon</span>
            </Link>
          </div>
          <Link
            to="/"
            className="flex items-center justify-between px-5 py-4 lg:hidden"
            onClick={handleToggleToFalse}
          >
            <h1 className="text-2xl font-bold">Amazon Home</h1>
            <AiOutlineHome size={25} />
          </Link>
          <div className="flex flex-col px-5 py-3 border-t-4 border-gray-300 lg:border-t-0">
            <h2 className="text-2xl font-bold mb-2">Trending</h2>
            <div className="flex flex-col">
              {navbarTrendings.map(({ name, value }) => (
                <Link key={value} className="text-lg my-2">
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col  px-5 py-3 border-y-4 lg:border-y-2 border-gray-300">
            <h2 className="text-2xl font-bold">Categories</h2>
            <div className="flex flex-col py-2">
              {categories.map((category) => (
                <Link key={category.value} to="/" className="text-lg my-2">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          className="w-1/5 lg:w-full h-full flex items-start justify-center lg:justify-start  bg-black bg-opacity-50 opacity-100"
          onClick={handleToggleToFalse}
        >
          <CgClose
            size={30}
            className="mt-10 lg:mt-5 lg:ml-5 hover:cursor-pointer text-white"
            onClick={handleToggleToFalse}
          />
        </div>
      </div>
    </>
  );
};

export default NavMenu;

{
  /* <div className="flex items-center justify-end lg:justify-start text-white">
              {!isAuthenticated ? (
                <Link to="/signin" className="pr-5">
                  Sign in
                </Link>
              ) : (
                <Link
                  to="/account"
                  className="flex lg:h-full lg:w-full items-center lg:pl-5 pr-5"
                  onClick={handleToggleToFalse}
                >
                  <BsPersonCircle
                    size={25}
                    className="hidden lg:flex lg:mr-2"
                  />
                  <p>Hello, {accountusername[0]}</p>
                  <AiOutlineUser size={25} className="flex ml-2 lg:hidden" />
                </Link>
              )}
            </div>
            <Link
              to="/"
              className="flex flex-col items-start justify-start px-5 mt-4 text-white lg:hidden"
              onClick={handleToggleToFalse}
            >
              <span className="text-xl font-semibold">Browse</span>
              <span className="text-3xl">Amazon</span>
            </Link> */
}
