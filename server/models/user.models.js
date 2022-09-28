import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { isEmail } from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      unique: String,
      validate: [isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

//  match: [
//       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//       "Please fill a valid email address",
//     ],
