import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducers";
import {
  productReducers,
  singleProductReducer,
} from "./reducers/productReducers";
import toggleReducer from "./toggleSlice";

const reducer = combineReducers({
  user: userReducer,
  products: productReducers,
  singleProduct: singleProductReducer,
  toggle: toggleReducer,
});

export const store = configureStore({
  reducer,
});
