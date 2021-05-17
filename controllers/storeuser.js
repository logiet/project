const user = require("../models/register");
const path = require("path");

module.exports = (req, res) => {
  //console.log(req.body);
  user.create(req.body, (error, user) => {
    //console.log(error);
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.flash("validationErrors", validationErrors);
      return res.redirect("/register");
    }
    res.redirect("/");
  });
};
