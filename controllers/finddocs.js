const unitamt = require("../models/unitamt");

module.exports = async (req, res) => {
  const unitamts = await unitamt.findById(req.params.id);
  res.render("specpost", {
    unitamts,
  });
};
