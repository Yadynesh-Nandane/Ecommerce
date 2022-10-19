import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import LoginSecurityEdit from "../components/LoginSecurityEdit";

const LoginSecurity = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const userData = [
    {
      fieldName: "Name",
      fieldValue: user?.user?.name,
    },
    {
      fieldName: "Email",
      fieldValue: user?.user?.email,
    },
    {
      fieldName: "Mobile Phone Number",
      fieldValue: user?.user?.mobileNumber,
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
              <Link to="/" className="w-[97px] h-[30px] ml-4 md:ml-16 lg:ml-24">
                <span
                  className="w-full h-full bg-amazon float-left -indent-[500px]"
                  style={{
                    backgroundPositionX: "-10px",
                    backgroundPositionY: "-84px",
                    backgroundRepeat: "no-repeat",
                  }}
                ></span>
              </Link>
            </header>
            <main className="w-full flex flex-col p-4">
              <div className="flex flex-col w-full h-full md:mx-auto md:w-[550px] md:h-auto">
                <h1 className="text-3xl font-semibold mb-6">
                  Login & Security
                </h1>
                <div className="mb-10 border border-black/50 rounded-md overflow-hidden">
                  {userData.map((user, i) => (
                    <LoginSecurityEdit
                      key={user.fieldName}
                      value={user.fieldValue}
                      name={user.fieldName}
                    />
                  ))}
                </div>
                <Link to="/" className="w-full h-12 flex justify-center">
                  <span className="w-11/12 h-full flex items-center justify-center text-xl font-semibold rounded-md bg-[#f3a847]">
                    Done
                  </span>
                </Link>
              </div>
            </main>
          </div>
        )
      )}
    </>
  );
};

export default LoginSecurity;
