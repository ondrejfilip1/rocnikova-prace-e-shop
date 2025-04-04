const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1000, // 1 sekunda
  max: 1, // maximalne 1 pozadavek za sekundu
});

const productsRouter = require("../controllers/products");

// vraci, jestli mame spravne heslo (limitovano na 1 pozadavek za sekundu z bezpecnostnich duvodu)
router.post("/password", limiter, productsRouter.hasCorrectPassword);

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
