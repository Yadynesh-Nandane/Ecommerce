import express from "express";

import {
  createProduct,
  findAllProducts,
  findSellersAllProducts,
  findSingleProduct,
  editProduct,
  deleteProduct,
  findSingleProductUser,
  createProductReview,
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

// Edit Sellers single Product
router
  .route("/product/edit/:id")
  .put(
    isAuthenticatedUser,
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    editProduct
  );

// Delete Sellers single Product
router
  .route("/product/delete/:id")
  .delete(
    isAuthenticatedUser,
    isAuthenticatedSeller,
    authorizedSellerRole("seller"),
    deleteProduct
  );

// Get single Product details for user using Id
router
  .route("/product/:id")
  .get(isAuthenticatedUser, authorizedUserRole("user"), findSingleProductUser);
export default router;

// Give reviews to products
router
  .route("/product/review")
  .put(isAuthenticatedUser, authorizedUserRole("user"), createProductReview);
