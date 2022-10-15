import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store";
import { loadUser } from "./actions/userActions";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import YourAccountPage from "./pages/YourAccountPage";
import LoginSecurityPage from "./pages/LoginSecurityPage";
import EditUserLoginPage from "./pages/EditUserLoginPage";
import { useSelector } from "react-redux";
import NavMenu from "./components/NavMenu";

const App = () => {
  const { toggleMenu } = useSelector((state) => state.toggle);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <div
        className={
          toggleMenu ? "w-full h-screen overflow-hidden" : "w-full h-full"
        }
      >
        <Router>
          {toggleMenu && <NavMenu />}
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/signin" element={<Loginpage />} />
            <Route exact path="/signup" element={<Registerpage />} />
            <Route exact path="/product/:id" element={<ProductDetailsPage />} />
            <Route exact path="/account" element={<YourAccountPage />} />
            <Route exact path="/security" element={<LoginSecurityPage />} />
            <Route
              exact
              path="/security/edit/:fieldName"
              element={<EditUserLoginPage />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
