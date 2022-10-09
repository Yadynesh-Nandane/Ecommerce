const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    exipres: process.env.JWT_EXPIRE,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
  });
};

export default sendToken;
