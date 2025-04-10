const express = require("express");
const router = express.Router();

const emailRouter = require("../controllers/mail");

// posle newsletter skupine prijemcu
// (potrebuje heslo, potebuje emailHTML, potrebuje emailList (pole prijemcu))
router.post("/group", emailRouter.sendGroupNewsletter);

// prida email do databaze
router.post("/add", emailRouter.addEmail);

// vraci vsechny emaily, vyzaduje heslo
router.post("/", emailRouter.getAllEmails);

module.exports = router;
