const Product = require("../models/products");
const AP_PASSWORD = process.env.AP_PASSWORD;

exports.hasCorrectPassword = async (req, res, next) => {
  try {
    const password = req.body.password;
    if (password === AP_PASSWORD) {
      return res.status(200).send({
        message: "Correct password",
      });
    } else {
      return res.status(500).send({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    // max pocet produktu ktery se budou zobrazovat na jedny strance
    const pageSize = 32;
    const { search, category, brand, minprice, maxprice, page } =
      req.query;
    let query = {};
    if (search) {
      // $regex - vyhledani podle vzoru
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      // tady nemusime davat velky nebo maly pismena, protoze kategorie se nebude zadavat uzivatelem
      query.category = category;
    }
    if (brand) {
      // oddeli carku (kdyby bylo vic znacek v query)
      query.brand = brand.split(",");
    }

    const price =
      minprice && maxprice ? { $gt: minprice, $lt: maxprice } : { $type: 16 };

    const data = page
      ? // hledani s pagination
        await Product.find({ ...query, price: price })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .sort({
            name: 1,
          })
      : // hledani bez pagination
        await Product.find({ ...query, price: price }).sort({
          name: 1,
        });

    if (data && data.length !== 0)
      return res.status(200).send({
        message: "Products found",
        payload: data,
      });

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
    const passwordReq = req.body.password;
    if (AP_PASSWORD === passwordReq) {
      const data = new Product({
        name: req.body.name,
        brand: req.body.brand,
        color: req.body.color,
        price: req.body.price,
        category: req.body.category,
        imagePath: req.body.imagePath,
        amount: req.body.amount,
      });
      const result = await data.save();
      if (result) {
        return res.status(201).send({
          message: "Product created",
          payload: result,
        });
      }
      return res.status(500).send({
        message: "Product not found",
      });
    } else {
      return res.status(500).send({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const passwordReq = req.body.password;
    if (AP_PASSWORD === passwordReq) {
      const data = {
        name: req.body.name,
        brand: req.body.brand,
        color: req.body.color,
        price: req.body.price,
        category: req.body.category,
        imagePath: req.body.imagePath,
        amount: req.body.amount,
      };
      const result = await Product.findByIdAndUpdate(req.params.id, data);
      if (result) {
        return res.status(200).send({
          message: "Product updated",
          payload: result,
        });
      }
      return res.status(500).send({
        message: "Product not updated",
      });
    } else {
      return res.status(500).send({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const passwordReq = req.body.password;
    if (AP_PASSWORD === passwordReq) {
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
    } else {
      return res.status(500).send({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
