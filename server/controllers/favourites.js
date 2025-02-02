const Favourites = require("../models/favourites");

exports.getAllFavourites = async (req, res, next) => {
  try {
    const data = await Favourites.find();
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Favourite items found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Favourite items not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addFavourite = async (req, res, next) => {
  try {
    const data = new Favourites({
      productId: req.body.productId,
      color: req.body.color
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        message: "Favourite item created",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Favourite item not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteFavourite = async (req, res, next) => {
  try {
    const result = await Favourites.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Favourite item deleted",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Favourite item not deleted",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
