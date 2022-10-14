/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setToggleMenu } from "../features/toggleSlice";
import categories from "./category";

const NavMenu = () => {
  const dispatch = useDispatch();
  const { toggleMenu } = useSelector((state) => state.toggle);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleToggleToFalse = () => {
    dispatch(setToggleMenu(false));
  };

  return (
    <>
      <div
        className={
          toggleMenu
            ? "w-full h-screen flex font-poppins absolute top-0  z-10"
            : "w-full h-screen flex font-poppins absolute top-0  z-0"
        }
      >
        <div className="flex flex-col w-4/5 lg:w-1/5 h-full bg-white">
          <div className="flex flex-col w-full h-[170px] lg:h-[65px] bg-[#131921] text-white">
            <div className="flex items-center justify-end p-5">
              {!isAuthenticated ? (
                <Link to="/signin">Sign in!</Link>
              ) : (
                <>
                  <p className="mr-3">{user?.user?.name}</p>
                  <AiOutlineUser size={25} />
                </>
              )}
            </div>
            <div className="flex flex-col items-start justify-start px-5 py-4 lg:hidden">
              <span className="text-xl font-semibold">Browse</span>
              <span className="text-3xl">Amazon</span>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center justify-between  px-5 py-4"
            onClick={handleToggleToFalse}
          >
            <h1 className="text-2xl font-bold">Amazon Home</h1>
            <AiOutlineHome size={25} />
          </Link>
          <div className="flex flex-col  px-5 py-3 border-y-4 border-gray-300">
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
        <div className="w-1/5 lg:w-4/5 h-full flex items-start justify-center lg:justify-start  bg-black bg-opacity-50 opacity-100">
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
