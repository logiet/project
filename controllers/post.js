const unitamt = require("../models/unitamt.js");

module.exports = async (req, res) => {
  if (req.session.userId) {
    const x = await unitamt
      .find()
      //.find({ userId: { _id: req.session.userId } })
      .populate({
        path: "userid",
        match: {
          _id: req.session.userId,
        },
      });
    //console.log(x);
    const unitamts = x.filter((variable) => {
      return variable.userid.length > 0;
    });
    //x = unitamts.filter((unitamts) => unitamts._id === req.session.userId);
    //console.log(x);
    return res.render("post", {
      unitamts,
    });
  }
  res.redirect("/login");
};
