var express = require("express");
var router = express.Router();

router.route.post("/login", function(req, res) {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;
  }
  var user = users[_.findIndex(users, { username: username })];
  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  if (user.password === req.body.password) {
    var payload = { id: user.id };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

module.exports = router;
