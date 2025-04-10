const nodemailer = require("nodemailer");

const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const AP_PASSWORD = process.env.AP_PASSWORD;

const Email = require("../models/mail");

exports.addEmail = async (req, res, next) => {
  try {
    const data = new Email({
      email: req.body.email,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        message: "Email added",
        payload: result,
      });
    }
    return res.status(500).send({
      message: "Email not added",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllEmails = async (req, res, next) => {
  if (AP_PASSWORD !== req.body.password) {
    return res.status(500).send({
      message: "Incorrect password",
    });
  }
  try {
    const data = await Email.find();

    if (data && data.length !== 0)
      return res.status(200).send({
        message: "Emails found",
        payload: data,
      });

    res.status(404).send({
      message: "Emails not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.sendGroupNewsletter = async (req, res, next) => {
  if (AP_PASSWORD !== req.body.password) {
    return res.status(500).send({
      message: "Incorrect password",
    });
  }
  if (req.body.emailList && req.body.emailHTML) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "pigressnewsletter@gmail.com",
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "pigressnewsletter@gmail.com",
      to: req.body.emailList,
      subject: "Pigress - Newsletter",
      text: "Toto je newsletter od e-shopu Pigress.",
      html: `
    ${req.body.emailHTML}

    Tým Pigress
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return res.status(500).send({
          message: "Error sending email",
        });
      } else {
        console.log("Email sent: ", info.response);
        return res.status(200).send({
          message: "Email sent succesfully",
          info: info.response,
        });
      }
    });
  } else {
    return res.status(500).send({
      message: "Enter both emailList and emailHTML",
    });
  }
};
