import User from "../models/user.models.js";

// User SignUp
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(406).send({
        success: false,
        message: "Passwords must match",
      });
    }

    const user = await User.create({ name, email, password });

    res.status(201).send({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

// User SignIn
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

    res.status(200).send({
      success: true,
      user,
    });
  } catch (err) {}
};

export const logoutUser = async (req, res, next) => {};
