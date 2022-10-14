import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPerson } from "react-icons/bs";
import { BiCaretDown } from "react-icons/bi";

import { setToggleMenu } from "../features/toggleSlice";
import NavMenu from "./NavMenu";
import categories from "./category";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { toggleMenu } = useSelector((state) => state.toggle);

  const [seletedCategory, setSelectedCategory] = useState("All");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const accountusername = user?.user?.name.split(" ");

  const handleToggleToTrue = () => {
    dispatch(setToggleMenu(true));
  };

  const detectSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleSelectedSubmit = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchFunctionally = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    if (windowSize.width > 1024) {
      dispatch(setToggleMenu(false));
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowSize.width, dispatch]);

  return (
    <>
      {toggleMenu && <NavMenu />}
      <header className="w-full h-[120px] lg:h-[120px] flex flex-col">
        <div className="w-full h-full lg:h-[70px] px-2 bg-[#131921]">
          <div className="w-full h-[46px] flex items-center justify-between pt-4 lg:pt-6 lg:px-6">
            {/* Mobile Handburger Menu and Logo */}
            <div className="h-full flex lg:hidden">
              <GiHamburgerMenu
                size={30}
                onClick={handleToggleToTrue}
                className=" text-white"
              />
              <Link to="/" className="w-[97px] h-[30px] ml-4 ">
                <span
                  className="w-full h-full bg-amazon float-left -indent-[500px]"
                  style={{
                    backgroundPositionX: "-10px",
                    backgroundPositionY: "-84px",
                    backgroundRepeat: "no-repeat",
                  }}
                ></span>
              </Link>
            </div>

            {/* Laptop Logo */}
            <div className="hidden lg:flex">
              <Link
                to="/"
                className="hidden lg:w-[115px] lg:h-[50px] lg:flex lg:border lg:border-white/0 lg:hover:border lg:hover:border-white rounded-md lg:py-2 lg:px-2 lg:mr-10"
              >
                <span
                  className="w-full h-full bg-amazon float-left -indent-[500px]"
                  style={{
                    backgroundPositionX: "-10px",
                    backgroundPositionY: "-50px",
                    backgroundRepeat: "no-repeat",
                  }}
                ></span>
              </Link>
            </div>

            {/* Laptop Search Box */}
            <div className="hidden w-full h-[40px] lg:flex flex-grow items-center">
              <form
                className="w-full h-full"
                onSubmit={handleSearchFunctionally}
              >
                <div className="w-full h-full flex bg-white rounded-lg overflow-hidden">
                  <div className="relative float-none top-0 -left-2 right-0 bottom-0 w-auto h-full pl-2 ">
                    <div className="relative float-left overflow-hidden top-0 bg-slate-200 w-auto h-full text-black border-r border-r-black/20">
                      <span className="relative top-1 truncate text-[13px] leading-8 mr-5 ml-3 min-w-19">
                        {seletedCategory}
                      </span>
                      <BiCaretDown className="absolute top-[13px] -right-0 ml-3" />
                    </div>
                    <select
                      className="absolute -top-1 left-0 h-9 w-auto cursor-pointer visible opacity-0 leading-9"
                      value={seletedCategory}
                      onChange={handleSelectedSubmit}
                    >
                      {categories.map((category) => (
                        <option
                          className="text-[13px] hover:bg-blue-500"
                          key={category.name}
                          value={category.value}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex w-full h-full">
                    <input type="text" className="w-full h-full outline-none" />
                    <button
                      type="submit"
                      className="px-2 h-full rounded-tr-lg rounded-br-lg bg-[#f3a847]"
                    >
                      <MdSearch size={30} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Laptop Sign in */}
            <div className="hidden lg:flex lg:mr-4">
              {isAuthenticated ? (
                <Link
                  to="/account"
                  className="hidden lg:w-[150px] lg:flex lg:flex-col lg:px-5 lg:py-2 lg:ml-6 text-white lg:border lg:border-white/0 lg:hover:border lg:hover:border-white rounded-md"
                >
                  <p className="flex text-xs font-semibold">
                    <span>Hello, </span>
                    <span>{accountusername[0]}</span>
                  </p>
                  <p className="flex items-center text-xs font-bold">
                    <span>Accounts & Lists</span>
                    <span>
                      <BiCaretDown />
                    </span>
                  </p>
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="hidden lg:w-[150px] lg:flex lg:flex-col lg:px-3 lg:py-2 lg:ml-6 text-white lg:border lg:border-white/0 lg:hover:border lg:hover:border-white rounded-md"
                >
                  <p className="flex text-xs font-semibold">
                    <span>Hello, </span> <span>sign in</span>
                  </p>
                  <p className="flex items-center text-sm font-bold">
                    <span>Accounts & Lists</span>
                    <span>
                      <BiCaretDown />
                    </span>
                  </p>
                </Link>
              )}
            </div>

            {/* Laptop orders and returns */}
            <div className="hidden lg:w-[130px] lg:flex lg:flex-col lg:px-3 lg:py-2 lg:mr-4 text-white lg:border lg:border-white/0 lg:hover:border lg:hover:border-white rounded-md">
              <p className="font-semibold text-xs">Returns</p>
              <p className="font-bold text-sm flex">
                <span>&</span>
                <span>Orders</span>
              </p>
            </div>

            {/* Mobile Sign in, Cart & Laptop Cart */}
            <div className="h-full flex items-center">
              {/* Mobile Sign in */}
              <div className="flex items-center text-white lg:hidden mr-4">
                {isAuthenticated ? (
                  <Link to="/account" className="flex items-center ">
                    <span className="text-sm font-bold">
                      {accountusername[0]}
                    </span>
                    <div className="w-[10px] h-[10px]">
                      <span
                        className=" w-full h-full bg-amazon float-left -indent-[500px]  "
                        style={{
                          backgroundPositionX: "-107px",
                          backgroundPositionY: "-358px",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></span>
                    </div>
                    <span className="mr-4">
                      <BsPerson size={30} />
                    </span>
                  </Link>
                ) : (
                  <Link to="/signin" className="flex items-center">
                    <span className="text-sm font-bold">Sign in</span>
                    <div className="w-[10px] h-[10px]">
                      <span
                        className="w-full h-full bg-amazon float-left -indent-[500px]  "
                        style={{
                          backgroundPositionX: "-107px",
                          backgroundPositionY: "-358px",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></span>
                    </div>
                    <span>
                      <BsPerson size={30} />
                    </span>
                  </Link>
                )}
              </div>

              {/* Mobile Cart */}
              <div className="w-[50px] h-[50px] lg:hidden  ">
                <span
                  className="w-full h-full bg-amazon float-left -indent-[500px]"
                  style={{
                    backgroundPositionX: "-10px",
                    backgroundPositionY: "-328px",
                    backgroundRepeat: "no-repeat",
                  }}
                ></span>
                <span className="absolute  right-[30px] lg:right-[54px] font-semibold text-lg text-[#f3a847]">
                  0
                </span>
              </div>

              {/* Laptop Cart */}
              <div className="hidden lg:w-[85px] lg:h-[50px] lg:flex lg:border lg:border-white/0 lg:hover:border lg:hover:border-white lg:rounded-md">
                <span
                  className="w-[50px] h-full bg-amazon"
                  style={{
                    backgroundPositionX: "0px",
                    backgroundPositionY: "-324px",
                    backgroundRepeat: "no-repeat",
                  }}
                ></span>
                <span className="absolute top-2 right-[78px] font-semibold text-xl text-[#f3a847]">
                  0
                </span>
                <span className="absolute top-9 right-10 text-white text-sm font-bold">
                  Cart
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-[46px] flex lg:hidden items-center mt-3">
            <form
              className="w-full h-[40px]"
              onSubmit={handleSearchFunctionally}
            >
              <div className="flex w-full h-full bg-white rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-2 w-full outline-none overflow-hidden"
                />
                <button
                  type="submit"
                  className="w-[55px] h-[40px] rounded-lg overflow-hidden"
                >
                  <span
                    className="w-full h-full bg-amazon float-left -indent-[500px] bg-[#f3a847]"
                    style={{
                      backgroundPositionX: "4px",
                      backgroundPositionY: "-282px",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:w-full lg:h-[50px] lg:flex lg:items-center justify-between bg-[#232f3e]  lg:px-9 text-white">
          <div className="flex items-center border border-white/0 hover:border hover:border-white  py-1 px-1.5 rounded-sm ">
            <GiHamburgerMenu size={20} className="mr-1" />
            <span className="text-md font-semibold">All</span>
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            Best Sellers
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            Mobiles
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            {" "}
            Electronics{" "}
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            Books
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            Fashion
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            Home & Kitchen
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            Computers
          </div>
          <div className="border border-white/0 hover:border hover:border-white  py-1 px-1.5">
            Sell
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
