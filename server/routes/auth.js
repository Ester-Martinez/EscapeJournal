const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      console.log("req.login ");
      console.log(user);
      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};

router.get("/login", (req, res, next) => {
  const dataView = {
    auth: true
  }
  if (req.query.error) {
    res.render("auth/login", {dataView,
      message: "Cuenta no activada, verifica tu email."
    });
  } else {
    res.render("auth/login", {dataView, message: req.flash("error") });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);
    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.get("/signup", (req, res, next) => {
  const dataView = {
    auth: true
  }
  if (req.query.error) {
    res.render("auth/signup", {dataView, message: "User not found" });
  } else {
    res.render("auth/signup", {dataView});
  }
});

router.post("/signup", (req, res, next) => {
  const { username, password, email, userType, name } = req.body;
  if (!username || !password) {
    next(new Error("You must provide both username and password"));
  }
  User.findOne({ username })
    .then(foundUser => {
      if (foundUser) throw new Error("Username already exists");

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new User({
        username,
        password: hashPass,
        email,
        userType,
        name
      }).save();
    })
    .then(savedUser => login(req, savedUser))
    .then(user => res.json({ status: "signup & login successful", user }))
    .catch(e => next(e));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
