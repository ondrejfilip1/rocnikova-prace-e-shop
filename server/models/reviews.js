const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      default: "Anonym",
      maxLength: 50,
    },
    content: { type: String, required: true, maxLength: 255 },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", schema);
