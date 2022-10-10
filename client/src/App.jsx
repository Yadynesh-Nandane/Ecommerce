import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store";
import { loadUser } from "./actions/userActions";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="signin" element={<Loginpage />} />
        <Route exact path="signup" element={<Registerpage />} />
        <Route exact path="product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
