const Review = require("../models/reviews");
const AP_PASSWORD = process.env.AP_PASSWORD;

exports.getAllReviews = async (req, res, next) => {
  try {
    // max pocet recenzi ktery se budou zobrazovat na jedny strance
    const pageSize = 24;
    const { page } = req.query;

    const data = page
      ? // hledani s pagination
        await Review.find(page)
          .skip((page - 1) * pageSize)
          .limit(pageSize)
      : // hledani bez pagination
        await Review.find(page);

    if (data && data.length !== 0)
      return res.status(200).send({
        message: "Reviews found",
        payload: data,
      });

    res.status(404).send({
      message: "Reviews not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getReviewCount = async (req, res, next) => {
  try {
    let result = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    // pro kazdy rating se zeptam serveru kolik s takovym ratingem existuje recenzi
    for (let i = 1; i <= 5; i++) {
      const data = await Review.countDocuments({ rating: i });
      result[i] = data;
    }

    return res.status(200).send({
      message: "Reviews found",
      payload: result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getNewestReviews = async (req, res, next) => {
  try {
    const data = await Review.find().limit(3).sort({ createdAt: -1 });

    if (data && data.length !== 0)
      return res.status(200).send({
        message: "Reviews found",
        payload: data,
      });

    res.status(404).send({
      message: "Reviews not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const data = new Review({
      username: req.body.username,
      content: req.body.content,
      rating: req.body.rating,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        message: "Review created",
        payload: result,
      });
    }
    return res.status(500).send({
      message: "Review not created",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const passwordReq = req.body.password;
    if (AP_PASSWORD === passwordReq) {
      const result = await Review.findByIdAndDelete(req.params.id);
      if (result) {
        return res.status(200).send({
          message: "Review deleted",
          payload: result,
        });
      }
      res.status(500).send({
        message: "Review not deleted",
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
