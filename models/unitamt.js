const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitamtschema = new Schema({
  As: Number,
  Sup: Number,
  Sui: Number,
  Med: Number,
  userid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
});

const unitamt = mongoose.model("unitamt", unitamtschema);

module.exports = unitamt;
