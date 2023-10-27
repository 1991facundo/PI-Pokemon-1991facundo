const getTypes = require("../controllers/getType");

const getTypeHandler = async (req, res) => {
  try {
    const types = await getTypes();
    res.status(200).json(types);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = getTypeHandler;
