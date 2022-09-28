import User from "../models/user.models.js";

// User Signup
const registerUser = async (req, res, next) => {
  const { name, emailAddress, password, confirm } = req.body;

  if (password !== confirm) {
    return next(
      res.status(400).send({
        success: false,
        message: "Password and confirm Password does not match",
      })
    );
  }

  if (password === confirm) {
    const user = await User.create({
      name,
      emailAddress,
      password,
    });

    res.status(201).send({
      success: true,
      user,
    });
  }
};

export { registerUser };
