import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

import { signOut, clearErrors } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  // console.log(user);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [error, dispatch]);
  return (
    <header className="w-full h-[140px] lg:h-20 border-b-2 flex px-4 lg:px-60">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center justify-between w-full h-20">
          <div className="text-black text-2xl">LOGO</div>
          <div className="">
            {!isAuthenticated && (
              <>
                <Link to="/signin" className="border rounded-full py-2 px-8">
                  Login
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <button
                  className=" font-poppins text-slate-50 font-semibold hover border border-[#007bff] bg-[#007bff] hover:border-[#c5322d] hover:bg-[#c5322d] rounded-full py-1 px-7 transition duration-150 ease-in-out"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-full h-10 flex items-center overflow-hidden">
          <form className="w-full h-full flex items-center overflow-hidden">
            <div className="w-full h-full border flex items-center rounded-full">
              <span className="w-[55px] h-full bg-[#007bff] rounded-tl-full rounded-bl-full flex items-center justify-center">
                <FaSearch size={18} color="white" />
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
