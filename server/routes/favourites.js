const express = require("express");
const router = express.Router();

const favouritesRouter = require("../controllers/favourites");

router.get("/", favouritesRouter.getAllFavourites);

router.post("/", favouritesRouter.addFavourite);

router.delete("/:id", favouritesRouter.deleteFavourite);

module.exports = router;
