import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, "Enter a name"],
    },
    email: {
      type: String,
      required: [true, "Enter a email"],
      unique: [true, "User already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Enter your mobile number"],
      length: [10, "Should be of exact 10 numbers"],
      unique: [true, "Phone number is already taken"],
      validate(value) {
        if (!validator.isMobilePhone(String(value), "en-IN")) {
          return "Invalid mobile number";
        }
      },
    },
    password: {
      type: String,
      required: [true, "Enter a password"],
      validate: [validator.isStrongPassword, "Enter a strong password"],
      select: false,
    },
    addresses: [
      {
        fullName: {
          type: String,
          trim: true,
          required: true,
        },
        mobileNumber: {
          type: String,
          required: [true, "Enter a mobile number"],
          length: [10, "Should be of exact 10 numbers"],
        },
        pinCode: {
          type: String,
          required: [true, "Enter a Pin Code"],
          length: [6, "Should be of exact 6 numbers"],
        },
        houseNo: {
          type: String,
          required: [true, "Enter a House No./ Flat No./Building"],
        },
        areaStreet: {
          type: String,
          required: [true, "Enter a Area/Street"],
        },
        landmark: {
          type: String,
        },
        townCity: {
          type: String,
          required: [true, "Enter a City"],
        },
        state: {
          type: String,
          required: [true, "Enter a state"],
        },
      },
    ],
    orders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "accept", "decline", "onway", "delivered"],
        },
        cancelled: {
          type: Boolean,
          default: false,
          enum: [false, true],
        },
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.path("mobileNumber").validate(function (v) {});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", userSchema);
