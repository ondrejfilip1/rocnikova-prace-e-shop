const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      index: { unique: true, dropDups: true },
      required: true,
      maxLength: 320,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Email", schema);
