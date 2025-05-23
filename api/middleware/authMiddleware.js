const users = require("../models/userModel");
const { verifyToken } = require("../utils/commonFunc");
const { rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");

const isAuthorized = async (req, res, next) => {
  const query = req.query;
  if (query.client === "true") {
    next();
  } else {
    const token = req.headers?.authorization;
    if (!token) {
      res.status(404).send("Unauthorized!");
    } else {
      try {
        const splitToken = token?.split(" ")[1];
        const authData = verifyToken(splitToken);
        if (authData) {
          const verifyUser = await users.findOne({
            where: {
              email: authData.email,
              isActive: true,
            },
          });
          if (verifyUser) {
            next();
          } else {
            res
              .status(statusCode.CLIENT_ERROR.UNAUTHORIZED)
              .send("Unauthorized!");
          }
        }
      } catch (err) {
        res
          .status(statusCode.CLIENT_ERROR.UNAUTHORIZED)
          .send(
            rejectResponse(statusCode.CLIENT_ERROR.UNAUTHORIZED, err?.message)
          );
      }
    }
  }
};

module.exports = {
  isAuthorized,
};
