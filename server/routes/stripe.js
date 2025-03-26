const express = require("express");
const router = express.Router();

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  });
});

const Product = require("../models/products");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { cart } = req.body;

    let amount = 0;
    for (const item of cart) {
      const data = await Product.findById(item.productId);
      if (data) amount += data.price * item.quantity;
      else
        res.status(404).send({
          message: "Product not found",
        });
    }
    //console.log(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "CZK",
      amount: amount * 100,
      automatic_payment_methods: { enabled: true },
    });

    // poslu publishable key a PaymentIntent detaily clientovi
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.get("/retrieve-payment-intent/:id", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.params.id
    );

    res.send({
      paymentIntent,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
