import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getToken,
  updateUserProfile,
  updateUserPassword,
  deleteUserProfile,
} from "../controller/user.controller.js";
import { isAuthenticatedUser } from "../middleware/userAuth.js";
import { authorizedUserRole } from "../middleware/Authorize.js";

const router = express.Router();

router.route("/get-token").get(isAuthenticatedUser, getToken);

// New user register
router.route("/register").post(registerUser);

// User login
router.route("/login").post(loginUser);

// User details
router
  .route("/me")
  .get(isAuthenticatedUser, authorizedUserRole("user"), getUserDetails);

// User Edit
router
  .route("/edit/me")
  .put(isAuthenticatedUser, authorizedUserRole("user"), updateUserProfile);

// User Password update
router
  .route("/password/update")
  .put(isAuthenticatedUser, authorizedUserRole("user"), updateUserPassword);

// Forget Password

// Reset Password using token

// Delete User Profile
router
  .route("/remove/me")
  .delete(isAuthenticatedUser, authorizedUserRole("user"), deleteUserProfile);

// User and seller
router.route("/logout").get(isAuthenticatedUser, logoutUser);

// User account delete

export default router;
