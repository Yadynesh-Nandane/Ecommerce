import jwt from "jsonwebtoken";

import User from "../models/user.models.js";
import Seller from "../models/seller.models.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({
        message: "Please login to access this resources",
      });
    }

    const decodeData = jwt.verify(token, "smd$msdaw#key");

    req.user = await User.findById(decodeData.id);

    // console.log(req.user.id);

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const isAuthenticatedSeller = async (req, res, next) => {
  try {
    const isSeller = await Seller.findOne({ user: req.user.id });

    if (!isSeller) {
      return res.status(401).send({
        message: "You can not access this resource",
      });
    }

    req.seller = isSeller;

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
