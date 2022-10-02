import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  businessDetails: {
    businessName: {
      type: String,
      required: [true, "Please enter business name"],
    },
    businessAddress: {
      type: String,
      required: [true, "Please enter business address"],
    },
  },
  aboutSeller: {
    type: String,
    required: [true, "About seller is required"],
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
    unique: true,
  },
  role: {
    type: String,
    enum: ["seller"],
    default: "seller",
  },
});

export default mongoose.model("Seller", sellerSchema);
