const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

const Product = require("../models/products");

exports.getPublishableKey = async (req, res) => {
  res.send({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  });
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { cart } = req.body;

    // posle se cely kosik az kosiku potom ziskavam celkovou cenu platby
    let amount = 0;
    for (const item of cart) {
      const data = await Product.findById(item.productId);
      if (data) amount += data.price * item.quantity;
      else
        res.status(404).send({
          message: "Product not found",
        });
    }
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
};

exports.getPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);

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
};
