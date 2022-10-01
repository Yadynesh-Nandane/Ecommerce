import mongoose from "mongoose";

const sellerModel = new mongoose.Schema({
  sellerName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  sellerDetails: {
    businessName: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
  },
  aboutSeller: {
    type: String,
    required: true,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  feedback: [
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  role: {
    type: String,
    enum: ["seller"],
    default: "seller",
  },
});
