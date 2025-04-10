const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    email: { type: String, required: true, maxLength: 320 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", schema);
