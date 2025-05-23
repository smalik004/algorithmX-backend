const {
  getClientsUser,
  addClientUser,
  deleteClientUser,
  updateClientUser,
} = require("../services/clientServices");

const getClients = async (req, res) => {
  try {
    const result = await getClientsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addClient = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addClientUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteClient = async (req, res) => {
  try {
    const payload = req.params;
    const result = await deleteClientUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateClient = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateClientUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = { getClients, addClient, deleteClient, updateClient };
