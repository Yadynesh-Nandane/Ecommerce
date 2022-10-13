import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { userReducer, editUserProfileReducer } from "./reducers/userReducers";
import {
  productReducers,
  singleProductReducer,
} from "./reducers/productReducers";
import toggleReducer from "./features/toggleSlice";

const reducer = combineReducers({
  user: userReducer,
  products: productReducers,
  singleProduct: singleProductReducer,
  editProfile: editUserProfileReducer,
  toggle: toggleReducer,
});

export const store = configureStore({
  reducer,
});
