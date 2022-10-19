import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter a product name"],
      minlength: [8, "Should be atleast 8 characters"],
      maxlength: [64, "Should be atmost 64 characters"],
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Enter a product description"],
      minlength: [20, "Should be atleast 20 characters"],
    },
    category: {
      product_category: {
        type: String,
        required: [true, "Enter product category"],
      },
      product_subcategory: {
        type: String,
        required: [true, "Enter product sub-category"],
      },
    },
    brand: {
      type: String,
      required: [true, "Enter brand name"],
    },
    price: {
      type: Number,
      required: [true, "Enter product price"],
      min: 1,
    },
    size: {
      type: String,
      required: [true, "Enter dimensions"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    color: {
      type: String,
      required: [true, "Enter product color"],
    },
    features: [
      {
        type: String,
        required: [true, "Enter a feature list"],
      },
    ],
    totalQuantity: {
      type: Number,
      required: [true, "Enter product quantity"],
      min: 1,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    finalRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: [true, "Enter rating"],
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: [true, "Enter comment"],
          minlength: [8, "Input be atleast 8 characters"],
          maxlength: [256, "Input exceeds 256 characters"],
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
