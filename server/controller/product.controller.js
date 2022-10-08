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

// Get products for users
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

// Get single product for user using Id
export const findSingleProductUser = async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id);

    if (!singleProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      singleProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Create a new review or re-review your feedback
export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.totalReviews = product.reviews.length;
    }

    let avg = 0;
    product.finalRating = product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.finalRating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
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

// Edit seller products
export const editProduct = async (req, res, next) => {
  try {
    const editedProduct = await Product.findOneAndUpdate(
      {
        $and: [{ seller: req.seller.id }, { _id: req.params.id }],
      },
      req.body
    );
    if (!editedProduct) {
      return res.status(404).send({
        success: false,
        message: `Product not found`,
      });
    }

    res.status(201).send({ success: true, editedProduct });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Delete Seller Products API
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      $and: [{ _id: req.params.id }, { seller: req.seller.id }],
    });

    if (!product) {
      return res.status(404).send({
        success: false,
        message: `Product not found`,
      });
    }

    await product.remove();

    res
      .status(200)
      .send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
