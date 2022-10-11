import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "../assets/amazon_PNG11.png";
import Loader from "../components/Loader";
import LoginSecurityEdit from "../components/LoginSecurityEdit";

const LoginSecurity = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const userData = [
    {
      name: "Name: ",
      value: user?.user?.name,
    },
    {
      name: "Email: ",
      value: user?.user?.email,
    },
    {
      name: "Mobile Phone Number:",
      value: user?.user?.phoneNumber,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated && (
          <div className="w-full h-full">
            <header className="w-full h-20 flex items-center bg-[#131921]">
              <Link to="/">
                <img
                  src={Logo}
                  alt="https://links.papareact.com/f90"
                  className="w-20 h-8 ml-5"
                />
              </Link>
            </header>
            <main className="w-full flex flex-col p-4">
              <h1 className="text-3xl font-semibold mb-6">Login & Security</h1>
              <div className="mb-10 border border-black/50 rounded-md overflow-hidden">
                {userData.map((user, i) => (
                  <LoginSecurityEdit
                    key={user.name}
                    value={user.value}
                    name={user.name}
                  />
                ))}
              </div>
              <Link to="/" className="w-full h-12 flex justify-center">
                <span className="w-11/12 h-full flex items-center justify-center text-xl font-semibold rounded-md bg-[#f3a847]">
                  Done
                </span>
              </Link>
            </main>
          </div>
        )
      )}
    </>
  );
};

export default LoginSecurity;
