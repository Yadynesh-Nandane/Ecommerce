import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";

import NavMenu from "./NavMenu";
import Logo from "../assets/amazon_PNG11.png";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [toggleDemo, setToggleDemo] = useState(false);

  return (
    <>
      {toggleDemo && (
        <NavMenu toggleDemo={toggleDemo} setToggleDemo={setToggleDemo} />
      )}
      <header className="relative w-full h-[140px] lg:h-20 flex font-poppins px-4  lg:px-60 bg-[#131921]">
        <div className="flex flex-col w-full h-full">
          <div className="flex items-center text-white w-full h-20">
            <GiHamburgerMenu size={32} onClick={() => setToggleDemo(true)} />
            <div className="flex items-center justify-between w-full ml-5">
              <Link to="/" className="text-2xl w-24">
                <img
                  src={Logo}
                  alt="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="">
                {!isAuthenticated && (
                  <>
                    <Link to="/signin" className="mr-2">
                      Hello, signin?
                    </Link>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <Link to="/account" className="mr-2">
                      Hello, {user?.user?.name}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex relative hover:cursor-pointer">
              <HiOutlineShoppingCart size={30} />
              <span className="absolute top-[-11px] left-7 text-[#f3a847]">
                0
              </span>
            </div>
          </div>
          <div className="w-full h-10 flex items-center overflow-hidden">
            <form className="w-full h-full flex items-center overflow-hidden">
              <div className="w-full h-full flex items-center rounded-lg">
                <span className="w-[55px] h-full bg-[#f3a847] rounded-tl-lg rounded-bl-lg flex items-center justify-center">
                  <FaSearch size={20} className="bg-[#f3a847] text-black" />
                </span>
                <input
                  type="search"
                  className="w-[390px] h-full rounded-tr-lg rounded-br-lg outline-none px-2 font-poppins text-md"
                  placeholder="Search"
                />
              </div>
              <input type="submit" className="hidden" />
            </form>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
