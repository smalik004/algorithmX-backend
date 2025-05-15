const users = require("../models/userModel");
const { verifyToken } = require("../utils/commonFunc");
const StatusCode = require("../utils/statusCode");

const isAuthorized = (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    res.status(404).send("Unauthorized!");
  } else {
    const splitToken = token?.split(" ")[1];
    const authData = verifyToken(splitToken);
    if (authData) {
      const verifyUser = users.findOne({
        where: {
          email: authData.email,
          isActive: true,
        },
      });
      if (verifyUser) {
        next();
      } else {
        res.status(StatusCode.CLIENT_ERROR.UNAUTHORIZED).send("Unauthorized!");
      }
    }
  }
};

module.exports = {
  isAuthorized,
};
