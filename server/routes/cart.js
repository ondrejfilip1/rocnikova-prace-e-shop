const express = require("express");
const router = express.Router();

const cartRouter = require("../controllers/cart");

router.get("/", cartRouter.getAllItems);

router.get("/:id", cartRouter.getItemById);

router.post("/", cartRouter.addItem);

router.put("/:id", cartRouter.updateQuantity);

router.delete("/:id", cartRouter.deleteItem);

module.exports = router;
