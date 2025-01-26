const Product = require("../models/products");

exports.getAllProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) {
      // $regex - vyhledani podle vzoru
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      // tady nemusime davat velky nebo maly pismena, protoze kategorie se nebude zadavat uzivatelem
      query.category = category;
    }
    const data = await Product.find(query).sort({ name: 1 });
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Products found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Products not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

/* exports.getProductByBrand = async (req, res, next) => {
  const { brand } = req.query;
  if (!brand) {
    return res.status(200).send({
      message: "Wrong query"
    })
  }
  try {
    const data = await Product.find({ brand: brand });
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Products found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Products not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
}; */

/*
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const data = await Product.find({ category: req.params.category });
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Product found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Product not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};*/

exports.getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "Product found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Product not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const data = new Product({
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      price: req.body.price,
      category: req.body.category,
      imagePath: req.body.imagePath,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        message: "Product created",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Product not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      price: req.body.price,
      category: req.body.category,
      imagePath: req.body.imagePath,
    };
    const result = await Product.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        message: "Product updated",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Product not updated",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Product deleted",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Product not deleted",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
