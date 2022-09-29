const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    exipres: "1h",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

export default sendToken;
