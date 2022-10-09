import * as productContants from "../constants/productConstants";

export const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case productContants.ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case productContants.ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case productContants.ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productContants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const singleProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productContants.GET_SINGLE_PRODUCT_FOR_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productContants.GET_SINGLE_PRODUCT_FOR_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case productContants.GET_SINGLE_PRODUCT_FOR_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productContants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
