import axios from "axios";

import { url } from "../api";
import * as userContants from "../constants/userConstants";

export const signUp =
  (name, email, phoneNumber, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: userContants.USER_SIGNUP_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${url}/register`,
        { name, email, phoneNumber, password, confirmPassword },
        config
      );

      dispatch({ type: userContants.USER_SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: userContants.USER_SIGNUP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userContants.USER_SIGNIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${url}/login`,
      { email, password },
      config
    );

    dispatch({ type: userContants.USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userContants.USER_SIGNIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: userContants.LOAD_USER_REQUEST });

    const config = { withCredentials: true };

    const { data } = await axios.get(`${url}/me`, config);

    dispatch({ type: userContants.LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userContants.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUserProfile = (editedData) => async (dispatch) => {
  try {
    dispatch({ type: userContants.EDIT_USERNAME_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`${url}/edit/me`, editedData, config);

    dispatch({ type: userContants.EDIT_USERNAME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userContants.EDIT_USERNAME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch({ type: userContants.USER_SIGNOUT_REQUEST });

    const config = { withCredentials: true };

    await axios.get(`${url}/logout`, config);

    dispatch({ type: userContants.USER_SIGNOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: userContants.USER_SIGNOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: userContants.CLEAR_ERRORS });
};
