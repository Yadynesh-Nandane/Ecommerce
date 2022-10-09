import * as userContants from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userContants.USER_SIGNUP_REQUEST:
    case userContants.USER_SIGNIN_REQUEST:
    case userContants.LOAD_USER_REQUEST:
    case userContants.USER_SIGNOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case userContants.USER_SIGNUP_SUCCESS:
    case userContants.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAuthenticated: true,
        user: action.payload,
      };
    case userContants.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case userContants.USER_SIGNOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case userContants.USER_SIGNUP_FAIL:
    case userContants.USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case userContants.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case userContants.USER_SIGNOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userContants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
