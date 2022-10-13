import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signIn, clearErrors } from "../actions/userActions";

const Loginpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    dispatch(signIn(user.email, user.password));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, dispatch, isAuthenticated, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-50">
      <main className="flex flex-col lg:flex-row w-[370px] lg:w-[1000px] md:w-[650px] h-auto lg:h-[650px] shadow-3xl rounded-2xl bg-white overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full h-[260px] lg:h-full bg-[#131921] py-16 ">
          <h1 className="text-2xl text-slate-50 md:text-2xl lg:text-3xl font-bold mb-6">
            New to our Website?
          </h1>
          <Link
            to="/signup"
            className="font-poppins font-semibold rounded-full px-8 py-2 text-sm md:text-md lg:text-lg bg-[#f3a847] lg:bg-[#febd69] hover:lg:bg-[#f3a847] transition duration-150 ease-in-out"
          >
            Create an Account
          </Link>
        </div>
        <div className="flex flex-col items-center w-full h-[460px]">
          <h1 className="font-semibold text-xl mt-7 lg:mt-28 mb-14">
            LOG IN TO ENTER
          </h1>
          <form
            className="flex flex-col w-[320px] md:w-[350px] font-poppins"
            onSubmit={handleSignInSubmit}
          >
            <input
              type="email"
              className="w-full border-b-2 outline-none my-3 lg:my-4 py-2 px-2"
              placeholder="Email "
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              className="w-full border-b-2 outline-none my-3 lg:my-4 py-2 px-2"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
              type="submit"
              className="bg-[#f3a847] lg:bg-[#febd69] hover:lg:bg-[#f3a847] rounded-full text-black  text-md font-semibold h-10 mt-10 transition duration-150 ease-in-out"
            >
              LOGIN
            </button>
          </form>
          <div className="font-poppins text-black mt-10">Forgot Password?</div>
        </div>
      </main>
    </div>
  );
};

export default Loginpage;
