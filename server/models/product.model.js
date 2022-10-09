import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      product_category: {
        type: String,
        required: true,
      },
      product_subcategory: {
        type: String,
        required: true,
      },
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    color: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    totalQuantity: {
      type: Number,
      required: true,
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
          required: true,
        },
        comment: {
          type: String,
          required: true,
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
