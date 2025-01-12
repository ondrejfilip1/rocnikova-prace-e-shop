const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  color: { type: String, required: true },
});

const cartSchema = mongoose.Schema({
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
