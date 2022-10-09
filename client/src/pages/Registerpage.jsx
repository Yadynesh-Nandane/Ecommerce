import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUp, clearErrors } from "../actions/userActions";

const Registerpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signUp(
        newUser.name,
        newUser.email,
        newUser.phoneNumber,
        newUser.password,
        newUser.confirmPassword
      )
    );
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main className="flex flex-col lg:flex-row w-[370px] lg:w-[1000px] md:w-[650px] h-auto lg:h-[650px] shadow-3xl">
        <div className="flex flex-col justify-center items-center w-full h-full bg-[#007bff] py-16 text-slate-50">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            Already have an account?
          </h1>
          <Link
            to="/signin"
            className="font-poppins font-semibold border rounded-full px-8 py-2 text-sm md:text-md lg:text-lg hover:bg-[#c5322d] hover:border-[#c5322d] transition duration-150 ease-in-out"
          >
            Login Now
          </Link>
        </div>
        <div className="flex flex-col items-center w-full h-[540px]">
          <h1 className="font-semibold text-lg mt-14 mb-14">
            CREATE AN ACCOUNT
          </h1>
          <form
            className="flex flex-col w-[300px] md:w-[350px] font-poppins"
            onSubmit={handleSignUpSubmit}
          >
            <input
              type="text"
              className="w-full border-b-2 outline-none my-2 lg:my-3 py-2 px-2"
              name="name"
              placeholder="Username"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              className="w-full border-b-2 outline-none my-2 lg:my-3 py-2 px-2"
              name="email"
              placeholder="Email Address"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full border-b-2 outline-none my-2 lg:my-3 py-2 px-2"
              name="phoneNumber"
              placeholder="Phone number"
              value={newUser.phoneNumber}
              onChange={(e) =>
                setNewUser({ ...newUser, phoneNumber: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full border-b-2 outline-none my-2 lg:my-3 py-2 px-2"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full border-b-2 outline-none my-2 lg:my-3 py-2 px-2"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-[#c5322d] text-slate-50 text-md font-semibold h-10 mt-10"
            >
              REGISTER
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Registerpage;
