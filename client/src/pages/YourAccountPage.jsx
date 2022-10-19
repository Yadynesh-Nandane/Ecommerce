import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineRight, AiFillCloseSquare } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import { RiProfileLine } from "react-icons/ri";

import Header from "../components/Header";
import { signOut, clearErrors } from "../actions/userActions";
import orderLogo from "../assets/orders.png";
import loginLogo from "../assets/signin-lock.png";
import addressLogo from "../assets/address-map.png";

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
        <div className="flex flex-col lg:hidden">
          <h1 className="text-3xl font-semibold mb-5">Your Account</h1>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Orders</h3>
            <div className="border border-black/40 rounded-lg">
              <Link
                to="/orders-history"
                className="flex items-center justify-between md:justify-start p-3 md:py-3 md:px-5"
              >
                <img
                  src={orderLogo}
                  alt="Your Orders"
                  className="hidden md:block md:h-24 md:w-32 md:object-contain md:mr-10"
                />
                <div className="flex flex-col ">
                  <span className="block text-lg md:text-xl md:mb-2">
                    Your Orders
                  </span>
                  <span className="hidden md:block md:text-md md:mb-2 text-black/80">
                    View your all orders done by you
                  </span>
                </div>
                <AiOutlineRight size={20} className="flex md:hidden" />
              </Link>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Account Settings</h3>
            <div className="flex flex-col border border-black/40 rounded-lg overflow-hidden">
              <Link
                to="/security"
                className="flex items-center justify-between md:justify-start border-b border-black/40 p-3 md:py-3 md:px-5"
              >
                <img
                  src={loginLogo}
                  alt="Your Security"
                  className="hidden md:block md:h-24 md:w-32 md:object-contain md:mr-10"
                />
                <div className="flex flex-col">
                  <span className="block text-lg md:text-xl md:mb-2">
                    Login & security
                  </span>
                  <span className="hidden md:block md:text-md md:mb-2 text-black/80">
                    Edit login, name and mobile number
                  </span>
                </div>
                <AiOutlineRight size={20} className="flex md:hidden" />
              </Link>
              <Link
                to="/manage/addresses"
                className="flex items-center justify-between md:justify-start border-b border-black/40 p-3 md:py-3 md:px-5"
              >
                <img
                  src={addressLogo}
                  alt="Your Orders"
                  className="hidden md:block md:h-24 md:w-32 md:object-contain md:mr-10"
                />
                <div className="flex flex-col">
                  <span className="block text-lg md:text-xl md:mb-2">
                    Your Addresses
                  </span>
                  <span className="hidden md:block md:text-md md:mb-2 text-black/80">
                    Edit addresses for orders and gifts
                  </span>
                </div>
                <AiOutlineRight size={20} className="flex md:hidden" />
              </Link>
              <Link
                to="/seller/me"
                className="flex items-center justify-between md:justify-start border-b p-3 md:py-3 md:px-5"
              >
                <RiProfileLine size={100} className="mx-3 hidden md:block" />
                <div className="flex flex-col md:ml-11">
                  <span className="block text-lg md:text-xl md:mb-2">
                    Manage your Seller Account
                  </span>
                  <span className="hidden md:block md:text-md md:mb-2 text-black/80">
                    Here you can view and manage your Seller Account
                  </span>
                </div>
                <AiOutlineRight size={20} className="flex md:hidden" />
              </Link>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Personalization</h3>
            <div className="border border-black/40 rounded-lg overflow-hidden">
              <Link
                to="/profile"
                className="flex items-center justify-between md:justify-start border-b p-3 md:py-3 md:px-5"
              >
                <FcManager size={100} className="mx-3 hidden md:block" />
                <div className="flex flex-col md:ml-11">
                  <span className="block text-lg md:text-xl md:mb-2">
                    Profile
                  </span>
                  <span className="hidden md:block md:text-md md:mb-2 text-black/80">
                    View your profile details here
                  </span>
                </div>
                <AiOutlineRight size={20} className="flex md:hidden" />
              </Link>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Data and Privacy</h3>
            <div className="border border-black/40 rounded-lg">
              <Link className="flex items-center justify-between md:justify-start border-b p-3 md:py-3 md:px-5">
                <AiFillCloseSquare
                  size={100}
                  className="mx-3 hidden md:block"
                />
                <div className="flex flex-col md:ml-11">
                  <span className="block text-lg md:text-xl md:mb-2">
                    Close your Amazon Account
                  </span>
                  <span className="hidden md:block md:text-md md:mb-2 text-black/80">
                    By closing your account, your Amazon Seller Account will
                    also be deleted if you have one.
                  </span>
                </div>
                <AiOutlineRight size={20} className="flex md:hidden" />
              </Link>
            </div>
          </div>

          <button
            className="w-full h-12 flex items-center justify-center text-xl border border-black/30 rounded-lg mt-12 bg-[#f3a847]"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-col items-start max-w-[1000px] mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Your Account</h1>
          <div className="flex flex-wrap  gap-4">
            <Link
              to="/orders-history"
              className="flex flex-1 border border-black/30 rounded-lg p-4"
            >
              <img
                src={orderLogo}
                alt="Your Orders"
                className="h-14 w-16 object-contain mr-6"
              />
              <div className="flex flex-col w-[250px]">
                <span className="text-xl">Your Orders</span>
                <span className="text-md text-black/80">
                  View your all orders done by you
                </span>
              </div>
            </Link>
            <Link
              to="/security"
              className="flex flex-1 border border-black/30 rounded-lg p-4"
            >
              <img
                src={loginLogo}
                alt="Login logo"
                className="h-14 w-16 object-contain mr-6"
              />
              <div className="flex flex-col w-[250px]">
                <span className="text-xl">Login & Security</span>
                <span className="text-md text-black/80">
                  Edit login, name and mobile number
                </span>
              </div>
            </Link>
            <Link
              to="/manage/addresses"
              className="flex flex-1 border border-black/30 rounded-lg p-4"
            >
              <img
                src={addressLogo}
                alt="Your Addresses"
                className="h-14 w-16 object-contain mr-6"
              />
              <div className="flex flex-col w-[250px]">
                <span className="text-xl">Your Addresses</span>
                <span className="text-md text-black/80">
                  Edit addresses for orders and gifts
                </span>
              </div>
            </Link>
            <Link
              to="/seller/me"
              className="flex flex-1 border border-black/30 rounded-lg p-4"
            >
              <RiProfileLine size={60} className="mx-3 hidden md:block mr-8" />
              <div className="flex flex-col w-[250px]">
                <span className="text-xl">Manage your Seller Account</span>
                <span className="text-md text-black/80">
                  View and manager you Seller Account
                </span>
              </div>
            </Link>
            <Link
              to="/profile"
              className="flex flex-1 border border-black/30 rounded-lg p-4"
            >
              <FcManager size={60} className="mx-3 hidden md:block mr-8" />
              <div className="flex flex-col w-[250px]">
                <span className="text-xl">Profile</span>
                <span className="text-md text-black/80">
                  View your profile details here
                </span>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default YourAccount;
