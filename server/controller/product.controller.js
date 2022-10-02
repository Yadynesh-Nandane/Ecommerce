import Product from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    req.body.seller = req.seller.id;

    const productItems = await Product.create(req.body);

    res.status(201).send({
      success: true,
      productItems,
    });
  } catch (err) {
    res.status(400).send({
      message: false,
      message: err.message,
    });
  }
};
