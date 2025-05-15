const { signInUser, signOutUser } = require("../services/authService");

const signIn = async (req, res) => {
  try {
    const payload = req.body;
    const result = await signInUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const signOut = async (req, res) => {
  try {
    const token = req.headers?.authorization;
    const result = await signOutUser(token);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  signIn,
  signOut,
};
