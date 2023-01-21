const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");
const dns = require("dns");

app.get("/verify-email", [check("email").isEmail()], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ Error: errors.array()[0].msg });
    }
    const email = req.query.email;
    const domain = email.split("@")[1];
    dns.resolveMx(domain, function (err, addresses) {
      if (err) {
        res
          .status(500)
          .send(`Email ${email} is not valid and does not exists.`);
      } else {
        res.send(`Email ${email} is valid and exists.`);
      }
    });
  } catch (err) {
    res.status(500).send(`An error occurred: ${err}`);
  }
});

app.get("/", (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
