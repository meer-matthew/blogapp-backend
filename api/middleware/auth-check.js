const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ");
    console.log(token);
    const decodedToken = jwt.verify(token[1], process.env.JWT_KEY);
    req.userData = decodedToken;
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
