const {
  getGlossariesUser,
  addGlossaryUser,
  updateGlossaryUser,
  deleteGlossaryUser,
} = require("../services/glossaryServices");

const getGlossaries = async (req, res) => {
  try {
    const result = await getGlossariesUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addGlossary = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addGlossaryUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateGlossary = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateGlossaryUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteGlossary = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteGlossaryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = { getGlossaries, addGlossary, updateGlossary, deleteGlossary };
