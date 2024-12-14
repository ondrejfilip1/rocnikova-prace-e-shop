const express = require("express");
const router = express.Router();

const cartRouter = require("../controllers/cart");

router.get("/", cartRouter.getAllItems);

router.post("/", cartRouter.addItem);

router.put("/:id", cartRouter.updateItem);

router.delete("/:id", cartRouter.deleteItem);

module.exports = router;
