import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [],
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Clothing"],
      requried: true,
    },
    brand: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    totalReviews: {
      type: Number,
      defaukt: 0,
    },
    rating: {
      type: String,
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
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// productSchema.pre("");

export default mongoose.model("Product", productSchema);
