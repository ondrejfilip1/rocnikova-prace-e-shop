const express = require("express");
const router = express.Router();

const productsRouter = require("../controllers/products");

// vraci, jestli mame spravne heslo
router.post("/password", productsRouter.hasCorrectPassword);

// vraci, kolik mame produktu
router.get("/count", productsRouter.getProductCount);

// vraci vsechny produkty, ktere chceme
router.get("/", productsRouter.getAllProducts);

// vraci jeden produkt, podle ID
router.get("/:id", productsRouter.getProductById);

// vytvari produkt (vyzaduje heslo)
router.post("/", productsRouter.createProduct);

// upravuje produkt (vyzaduje heslo)
router.put("/:id", productsRouter.updateProduct);

// smaze produkt (vyzaduje heslo)
router.delete("/:id", productsRouter.deleteProduct);

module.exports = router;
