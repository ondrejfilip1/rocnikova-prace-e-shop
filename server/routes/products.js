const express = require("express");
const router = express.Router();

const productsRouter = require("../controllers/products");

router.get("/", productsRouter.getAllProducts);

/* router.get("/search", productsRouter.getProductByBrand); */

router.get("/:id", productsRouter.getProductById);

router.post("/", productsRouter.createProduct);

router.put("/:id", productsRouter.updateProduct);

router.delete("/:id", productsRouter.deleteProduct);

module.exports = router;
