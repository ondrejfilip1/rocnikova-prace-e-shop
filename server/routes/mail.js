const express = require("express");
const router = express.Router();

const emailRouter = require("../controllers/mail");

// posle newsletter skupine prijemcu
// (potrebuje heslo, potrebuje emailHTML, potrebuje emailList (pole prijemcu))
router.post("/group", emailRouter.sendGroupNewsletter);

// prida email do databaze
router.post("/add", emailRouter.addEmail);

// vraci vsechny emaily, vyzaduje heslo
router.post("/", emailRouter.getAllEmails);

// smaze dany email, vyzaduje heslo
router.delete("/:id", emailRouter.removeEmail);

module.exports = router;
