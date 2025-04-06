const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

// nechceme aby uzivatele spamovali recenze
const limiter = rateLimit({
  windowMs: 3600000, // 1 hodina
  max: 1, // maximalne 1 pozadavek za 1 hodinu
});

const reviewsRouter = require("../controllers/reviews");

// vytvari recenzi (limitovano na 1 pozadavek za hodinu z duvodu spamovani)
router.post("/", limiter, reviewsRouter.createReview);

// vraci vsechny recenze
router.get("/", reviewsRouter.getAllReviews);

// vraci 3 nejnovejsi recenze
router.get("/newest", reviewsRouter.getNewestReviews);

// vraci pocet recenzi s ratingem 1 az 5
router.get("/count", reviewsRouter.getReviewCount);

// smaze recenzi (vyzaduje heslo)
router.delete("/:id", reviewsRouter.deleteReview);

module.exports = router;
