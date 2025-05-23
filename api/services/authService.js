const users = require("../models/userModel");
const {
  decryptText,
  generateToken,
  verifyToken,
} = require("../utils/commonFunc");
const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");

const signInUser = async (payload) => {
  try {
    const { email, password } = payload;
    const isEmailExist = await users.findOne({
      where: {
        email,
      },
    });
    if (isEmailExist) {
      const decryptUserPassword = decryptText(password);
      const decryptDBPassword = decryptText(isEmailExist?.password);
      if (decryptUserPassword === decryptDBPassword) {
        const updateUser = await isEmailExist.update({
          isLoggedIn: true,
          updatedAt: new Date(),
        });
        if (updateUser) {
          const data = {
            email: isEmailExist?.email,
            role: isEmailExist?.role,
            permissions: isEmailExist?.permissions,
            isLoggedIn: updateUser?.isLoggedIn,
            isActive: isEmailExist?.isActive,
          };
          const generateTokenResult = generateToken(data);
          if (generateTokenResult) {
            data.token = generateTokenResult;
          }

          return successResponse(statusCode.SUCCESS.OK, "Success!", data);
        }
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.UNAUTHORIZED,
          "Incorrect password! Please try again"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Email doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const signOutUser = async (token) => {
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
        const data = {
          isLoggedIn: false,
          updatedAt: new Date(),
        };
        const result = await verifyUser.update(data);
        if (result) {
          return successResponse(statusCode.SUCCESS.OK, "Logout Success!");
        }
      } else {
        res.status(statusCode.CLIENT_ERROR.UNAUTHORIZED).send("Unauthorized!");
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = { signInUser, signOutUser };
