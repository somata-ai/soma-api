var express = require("express");
var passport = require("passport");
var router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // session: false,
    failureRedirect: "/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    var responseHTML =
      '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
    responseHTML = responseHTML.replace(
      "%value%",
      JSON.stringify({
        user: req.user,
      })
    );
    res.status(200).send(responseHTML);
  }
);

module.exports = router;
