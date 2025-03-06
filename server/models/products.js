const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: [String], required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imagePath: { type: String, required: true },
  amount: { type: String, required: false, default: 1 },
  // availableSizes: { type: [String], required: true },
});

module.exports = mongoose.model("Product", schema);
