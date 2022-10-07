import Product from "../models/product.model.js";
import Seller from "../models/seller.models.js";

// Seller Creating new product
export const createProduct = async (req, res, next) => {
  try {
    req.body.seller = req.seller.id;

    const product = await Product.create(req.body);

    res.status(201).send({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get products
export const findAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.status(200).send({
      success: true,
      allProducts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get all Products of seller
export const findSellersAllProducts = async (req, res, next) => {
  try {
    const allSellerProducts = await Product.find({ seller: req.seller.id });

    res.status(200).send({
      success: true,
      allSellerProducts,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

// Get single Product of seller for seller
export const findSingleProduct = async (req, res, next) => {
  try {
    const getSingleProduct = await Product.find({
      $and: [{ seller: req.seller.id }, { _id: req.params.id }],
    });

    res.status(200).send({
      success: true,
      getSingleProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
