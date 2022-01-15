const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
// router.get("/fakeuser", async (req, res) => {
//   const user = {
//     email: "shubham@gmail.com",
//     username: "shubham",
//   };
//   const newUser = await User.register(user, "sabeel12");

//   res.send(newUser);
// });

router.get("/register", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const newUser = await User.register(user, password);

    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/todos");
    });
  } catch (e) {
    res.redirect("/register");
  }
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: false,
  }),
  (req, res) => {
    console.log(req.user);

    // req.flash("success", `Welcome Back  ${req.user.username} Again!!`);
    console.log("Logged In Succcessfully!");
    res.redirect("/todos");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
