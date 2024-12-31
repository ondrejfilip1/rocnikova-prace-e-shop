const Cart = require("../models/cart");

exports.getAllItems = async (req, res, next) => {
  try {
    const data = await Cart.find();
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Cart items found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Cart items not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const data = await Cart.findById(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "Cart found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Cart not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    const { itemId, newQuantity } = req.body;
    
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(item => item._id == itemId);
    if (!item) {
      return res.status(404).send({
        message: "Item not found",
      });
    }

    // prepisu kvantitu
    item.quantity = newQuantity;

    // ulozim zmeny
    await cart.save();

    return res.status(200).send({
      message: "Cart updated successfully",
      payload: cart,
      quantities: cart.items.map(item => item.quantity)
    });
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const data = new Cart({
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
    data.items.push({ productId, quantity });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        message: "Item created",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Item not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

/*
exports.updateItem = async (req, res, next) => {
  try {
    const data = {
      productId: req.body.productId,
      quantity: req.body.quantity,
    };
    const result = await Cart.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        message: "Item updated",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Item not updated",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
*/

exports.deleteItem = async (req, res, next) => {
  try {
    const result = await Cart.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Item deleted",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Item not deleted",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
