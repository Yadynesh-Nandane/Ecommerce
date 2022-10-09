import axios from "axios";

import { url } from "../api";
import * as productContants from "../constants/productConstants";

export const allProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productContants.ALL_PRODUCTS_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${url}/products/all`, config);

    dispatch({ type: productContants.ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: productContants.ALL_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const userSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: productContants.GET_SINGLE_PRODUCT_FOR_USER_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${url}/product/${id}`, config);

    dispatch({
      type: productContants.GET_SINGLE_PRODUCT_FOR_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productContants.GET_SINGLE_PRODUCT_FOR_USER_FAIL,
      payload: error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: productContants.CLEAR_ERRORS });
};
