const jwt = require("jsonwebtoken");

exports.getToken = (req, res, next) => {
  return jwt.sign(req, `${process.env.JWT_KEY}`, { expiresIn: "1h" });
};
