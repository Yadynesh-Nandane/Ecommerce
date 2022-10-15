import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineRight } from "react-icons/ai";

import Header from "../components/Header";
import { signOut, clearErrors } from "../actions/userActions";

const YourAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, error } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(signOut());

    navigate("/");
  };

  useEffect(() => {
    if (!isAuthenticated && (user === null || undefined)) {
      navigate("/signin");
    }
  }, [dispatch, error, user, navigate]);

  return (
    <>
      <Header />
      <main className="w-full h-full p-4">
        <h1 className="text-3xl font-bold mb-4">Your Account</h1>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2">Orders</h3>
          <div className="border border-black/40 rounded-lg">
            <Link
              to="/orders-history"
              className="flex items-center justify-between p-3"
            >
              <p className="text-lg">Your Orders</p>
              <AiOutlineRight size={20} />
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2">Account Settings</h3>
          <div className="flex flex-col border border-black/40 rounded-lg">
            <Link
              to="/security"
              className="flex items-center justify-between border-b border-black/40 p-3"
            >
              <p className="text-lg">Login & security</p>
              <AiOutlineRight size={20} />
            </Link>
            <Link
              to="/manage/addresses"
              className="flex items-center justify-between border-b border-black/40 p-3"
            >
              <p className="text-lg">Manage addresses</p>
              <AiOutlineRight size={20} />
            </Link>
            <Link
              to="/seller/me"
              className="flex items-center justify-between p-3"
            >
              <p className="text-lg">Manage your Seller Account</p>
              <AiOutlineRight size={20} />
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2">Personalization</h3>
          <div className="border border-black/40 rounded-lg">
            <Link
              to="/profile"
              className="flex items-center justify-between p-3"
            >
              <p className="text-lg">Profile</p>
              <AiOutlineRight size={20} />
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2">Data and Privacy</h3>
          <div className="border border-black/40 rounded-lg">
            <div className="flex items-center justify-between p-3">
              <p className="text-lg">Close your Amazon Account</p>
              <AiOutlineRight size={20} />
            </div>
          </div>
        </div>

        <button
          className="w-full h-12 flex items-center justify-center text-xl border border-black/30 rounded-lg mt-12 bg-[#f3a847]"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </main>
    </>
  );
};

export default YourAccount;
