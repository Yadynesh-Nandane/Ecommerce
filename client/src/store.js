import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducers";
import {
  productReducers,
  singleProductReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  user: userReducer,
  products: productReducers,
  singleProduct: singleProductReducer,
});

export const store = configureStore({
  reducer,
});
