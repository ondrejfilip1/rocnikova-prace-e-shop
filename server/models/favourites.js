const mongoose = require("mongoose");

const schema = mongoose.Schema({
  productId: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Favourites", schema);
