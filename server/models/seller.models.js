import mongoose from "mongoose";
import validator from "validator";

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter a name"],
    },
    email: {
      type: String,
      required: [true, "Enter a email"],
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
      unique: [true, "User already exists"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Enter your phone number"],
      length: [10, "Should be of exact 10 numbers"],
      unique: [true, "Phone number is already taken"],
    },
    businessDetails: {
      businessName: {
        type: String,
        required: [true, "Please enter business name"],
      },
      businessAddress: {
        type: String,
        required: [true, "Please enter business address"],
        minlength: [5, "Insufficient Address Details"],
      },
    },
    aboutSeller: {
      type: String,
      required: [true, "Please enter something about you"],
      maxlength: [256, "Input exceeds 256 characters"],
    },
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
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);
