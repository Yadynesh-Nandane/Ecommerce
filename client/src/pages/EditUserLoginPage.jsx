import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserProfile,
  clearErrors,
  loadUser,
} from "../actions/userActions";
import { EDIT_USERNAME_RESET } from "../constants/userConstants";
import Loader from "../components/Loader";

const EditUserLoginPage = () => {
  const { fieldName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const {
    loading: editLoading,
    isUpdated,
    error: editError,
  } = useSelector((state) => state.editProfile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUserNameChangeSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    };

    dispatch(updateUserProfile(formData));
  };

  useEffect(() => {
    if (!isAuthenticated && user === null) {
      navigate("/signin");
    }

    if (user) {
      setName(user?.user?.name || "");
      setEmail(user?.user?.email || "");
      setPhoneNumber(user?.user?.phoneNumber || "");
    }

    if (isUpdated) {
      dispatch(loadUser());

      navigate("/security");

      dispatch({ type: EDIT_USERNAME_RESET });
    }
  }, [navigate, isAuthenticated, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated && (
          <div className="w-full h-screen">
            <header className="w-full h-20 flex items-center bg-[#131921]">
              <Link to="/">
                <img
                  src=""
                  alt="https://links.papareact.com/f90"
                  className="w-20 h-8 ml-5"
                />
              </Link>
            </header>
            <main className="w-full p-5">
              <form
                encType="multipart/form-data"
                onSubmit={handleUserNameChangeSubmit}
              >
                <div
                  className={fieldName === "name" ? "flex flex-col " : "hidden"}
                >
                  <h1 className="text-2xl font-semibold mb-5">
                    Change Your Name
                  </h1>
                  <div className="mb-5">
                    If you want to change your name associated with your Amazon
                    customer account, you may do so below. After change your{" "}
                    <span className="font-semibold">
                      Amazon Seller Account Name
                    </span>{" "}
                    will also be change. Be sure to click the{" "}
                    <span className="font-semibold">Save Changes</span> button
                    when you are done.
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full border border-black/50 p-3 mb-5 rounded-lg"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  className={fieldName === "email" ? "flex flex-col" : "hidden"}
                >
                  <h1 className="text-2xl font-semibold mb-5">
                    Change your email address
                  </h1>
                  <div className="mb-5">
                    <div className="flex flex-col mb-4">
                      <span className="font-semibold">
                        Current email address:{" "}
                      </span>
                      <span>{user?.user?.email}</span>
                    </div>
                    Enter the new email address you would like to associate with
                    your account below. Your Amazon Seller account email address
                    will also be modified.
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full border border-black/50 p-3 mb-5 rounded-lg "
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  className={
                    fieldName === "mobilephonenumber"
                      ? "flex flex-col"
                      : "hidden"
                  }
                >
                  <h1 className="text-2xl font-semibold mb-5">
                    Change Mobile Number
                  </h1>
                  <div className="mb-5">
                    <div className="flex flex-col mb-5">
                      <span className="text-lg font-semibold">
                        Old mobile number:{" "}
                      </span>
                      <span>{user?.user?.phoneNumber}</span>
                    </div>
                    Enter the new mobile phone number you would like to
                    associate with your account below. Your Amazon Seller
                    account mobile phone number will also be modified.
                  </div>
                  <input
                    className="w-full border border-black/50 p-3 mb-5 rounded-lg "
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Save Changes"
                  className="text-lg p-3 w-full font-semibold rounded-lg bg-[#f3a847]"
                />
              </form>
            </main>
          </div>
        )
      )}
    </>
  );
};

export default EditUserLoginPage;
