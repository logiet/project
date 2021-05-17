const unitamt = require("../models/unitamt");

module.exports = async (req, res) => {
  //console.log(req.body);
  await unitamt.create({ ...req.body, userid: req.session.userId });
  res.redirect("/");
};
