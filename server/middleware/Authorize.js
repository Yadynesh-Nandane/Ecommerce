export const authorizedUserRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        message: `Roles: ${req.user.role} is not allowed to access resources`,
      });
    }
    next();
  };
};

export const authorizedSellerRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.seller.role)) {
      return res.status(403).send({
        message: `Roles: ${req.seller.role} is not allowed to access resources`,
      });
    }
    next();
  };
};
