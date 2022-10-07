import express from "express";

import {
  createProduct,
  findAllProducts,
  findSellersAllProducts,
  findSingleProduct,
} from "../controller/product.controller.js";
import {
  authorizedUserRole,
  authorizedSellerRole,
} from "../middleware/Authorize.js";
import {
  isAuthenticatedUser,
  isAuthenticatedSeller,
} from "../middleware/userAuth.js";

const router = express.Router();

// Create new products for seller
router
  .route("/product/new")
  .post(
    isAuthenticatedUser,
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    createProduct
  );

// Get All Products for user
router
  .route("/products/all")
  .get(isAuthenticatedUser, authorizedUserRole("user"), findAllProducts);

// Get All Products of seller
router
  .route("/products/seller/me")
  .get(
    isAuthenticatedUser,
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    findSellersAllProducts
  );

// Get Sellers single Product
router
  .route("/product/seller/:id")
  .get(
    isAuthenticatedUser,
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    findSingleProduct
  );

export default router;
