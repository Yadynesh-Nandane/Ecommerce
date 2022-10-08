import Seller from "../models/seller.models.js";
import User from "../models/user.models.js";

// New Seller
export const createSeller = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user.id);

    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    req.body.user = req.user.id;
    req.body.sellerName = userData.name;
    req.body.email = userData.email;
    req.body.phoneNumber = userData.phoneNumber;

    const seller = await Seller.create(req.body);

    res.status(201).send({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// Get your seller details
export const findSellerDetails = async (req, res, next) => {
  try {
    const userData = await User.findOne({ id: req.seller.user });
    const seller = await Seller.findById(req.seller.id);

    if (userData.id !== seller.user.toString()) {
      return res.status(401).send({
        success: false,
        message: "You can't access this resources",
      });
    } else {
      res.status(200).send({
        success: true,
        seller,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Update Seller Details and sync with user data
export const updateSellerDetails = async (req, res, next) => {
  try {
    const userData = await User.findOne({ id: req.seller.user });
    const sellerData = await Seller.findById(req.seller.id);

    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    } else if (userData && !sellerData) {
      return res.status(404).send({
        success: false,
        message: "Seller does not exist",
      });
    } else {
      if (userData.id === sellerData.user.toString()) {
        if (
          userData.name !== req.body.sellerName ||
          userData.email !== req.body.email ||
          userData.phoneNumber !== req.body.phoneNumber
        ) {
          userData.name = req.body.sellerName;
          userData.email = req.body.email;
          userData.phoneNumber = req.body.phoneNumber;
          sellerData.sellerName = req.body.sellerName;
          sellerData.email = req.body.email;
          sellerData.phoneNumber = req.body.phoneNumber;
        }
        sellerData.businessDetails = req.body.businessDetails;
        sellerData.aboutSeller = req.body.aboutSeller;

        await userData.save({ validateBeforeSave: true });
        await sellerData.save({ validateBeforeSave: true });

        res.status(201).send({ success: true, sellerData });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const deleteSeller = async (req, res, next) => {
  try {
    const sellerData = await Seller.findById(req.seller.id);
    const userData = await User.findOne({ id: sellerData.user.toString() });

    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    } else if (userData && !sellerData) {
      return res.status(404).send({
        success: false,
        message: "Seller does not exist",
      });
    } else if (userData && sellerData) {
      if (userData.id !== sellerData.user.toString()) {
        return res.status(401).send({
          success: false,
          message: "You can not access this resource",
        });
      }
      await sellerData.remove();

      res.status(200).send({
        success: true,
        message: "Successfully deleted your seller services",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
