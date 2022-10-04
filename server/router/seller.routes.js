import express from "express";

import {
  createSeller,
  deleteSeller,
  findSellerDetails,
  updateSellerDetails,
} from "../controller/seller.controller.js";
import {
  isAuthenticatedUser,
  isAuthenticatedSeller,
} from "../middleware/userAuth.js";
import {
  authorizedUserRole,
  authorizedSellerRole,
} from "../middleware/Authorize.js";

const router = express.Router();

// Create new seller
router
  .route("/seller/new")
  .post(isAuthenticatedUser, authorizedUserRole("user"), createSeller);

// Your seller Details
router
  .route("/seller/me")
  .get(
    isAuthenticatedUser,
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    findSellerDetails
  );

// Update seller details and async with User
router
  .route("/seller/edit")
  .put(
    isAuthenticatedUser,
    authorizedUserRole("user"),
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    updateSellerDetails
  );

router
  .route("/seller/delete")
  .delete(
    isAuthenticatedUser,
    authorizedUserRole("user"),
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    deleteSeller
  );

export default router;

// , authorizedSellerRole("seller")
