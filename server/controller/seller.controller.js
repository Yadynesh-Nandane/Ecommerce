import Seller from "../models/seller.models.js";
import User from "../models/user.models.js";

// New Seller
export const createSeller = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user.id);

    // console.log(userData);

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
    const seller = await Seller.findById(req.seller.id);

    // console.log(seller);

    res.status(200).send({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Update Seller Details and sync with user data
export const updateSellerDetails = async (req, res, next) => {
  try {
    const userData = await User.findOne({ id: req.seller.id });

    if (
      userData.name !== req.body.sellerName ||
      userData.email !== req.body.email ||
      userData.phoneNumber !== req.body.phoneNumber
    ) {
      userData.name = req.body.sellerName;
      userData.email = req.body.email;
      userData.phoneNumber = req.body.phoneNumber;

      await userData.save({
        validateBeforeSave: true,
        validateModifiedOnly: true,
      });
    }

    const seller = await Seller.findByIdAndUpdate(req.seller.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).send({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
