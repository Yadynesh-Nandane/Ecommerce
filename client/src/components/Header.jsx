import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

import { signOut, clearErrors } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const { error, isAuthenticated, user } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [error, dispatch]);
  return (
    <header className="w-full h-[140px] lg:h-20 flex font-poppins px-4  lg:px-60 bg-[#131921]">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center justify-between text-white w-full h-20">
          <div className="text-2xl">LOGO</div>
          <div className="">
            {!isAuthenticated && (
              <>
                <Link to="/signin" className="">
                  Hello, signin
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <button className="" onClick={handleSignOut}>
                  Hello, {user.name}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-full h-10 flex items-center overflow-hidden">
          <form className="w-full h-full flex items-center overflow-hidden">
            <div className="w-full h-full  flex items-center rounded-full">
              <span className="w-[55px] h-full bg-[#f3a847] rounded-tl-full rounded-bl-full flex items-center justify-center">
                <FaSearch size={18} className="bg-[#f3a847] text-black" />
              </span>
              <input
                type="search"
                className="w-[390px] h-full rounded-tr-full rounded-br-full outline-none px-2 font-poppins text-md"
              />
            </div>
            <input type="submit" className="hidden" />
          </form>
        </div>
      </div>
    </header>
  );
};
export default Header;
