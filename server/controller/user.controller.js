import User from "../models/user.models.js";
import Seller from "../models/seller.models.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendMail.js";
import { response } from "express";

export const getToken = (req, res) => {
  res.send(req.cookies);
};

// User Sign Up
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(406).send({
        success: false,
        message: "Passwords must match",
      });
    }

    const user = await User.create({ name, email, phoneNumber, password });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// User Sign In
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// After user login 'UserName' update controller
export const updateUserNameOfUserAndSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const seller = await Seller.findOne({ user: req.user.id });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    } else {
      if (user && seller) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;
        seller.sellerName = req.body.name;
        seller.email = req.body.email;
        seller.phoneNumber = req.body.phoneNumber;

        await user.save({ validateModifiedOnly: true });
        await seller.save({ validateModifiedOnly: true });

        return res.status(201).send({
          success: true,
          user,
        });
      } else if (user && !seller) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;

        await user.save({ validateModifiedOnly: true });

        res.status(201).send({
          success: true,
          user,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Update User Password after Sign In
export const updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPassword = await user.comparePassword(req.body.oldPassword);

    if (!isPassword) {
      return res.status(401).send({
        success: false,
        message: "Old password is invalid",
      });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Password does not match" });
    }

    if (req.body.oldPassword === req.body.newPassword) {
      return res.status(400).send({
        success: false,
        message: "New Password should be different from old Password",
      });
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// User on click 'Forget Password?'
export const forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    });
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocal}://${req.get(
    "host"
  )}/v1/password/reset/${resetToken}`;

  const message = `Your password reset link is :- ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-commerce Password Recovery",
      message,
    });

    res.status(200).send({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(500).send({ success: false, message: error.message });
  }
};

// User Profile Delete and if user is also seller then delete both data from User and Seller collection
export const deleteUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    }

    await user.remove();
    res
      .status(200)
      .send({ success: true, message: "User Deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// User Sign out
export const logoutUser = (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).send({
      success: true,
      message: "Sign out",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
