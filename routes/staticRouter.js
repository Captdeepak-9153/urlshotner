const express = require("express");
const URL = require("../models/url");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy: req.user._id });
    const username = await User.find({name:req.user.name})
    return res.render("home", {
      urls: allurls,
      name:username,
    });
  });

  router.get("/signup", (req, res) => {
    return res.render("signup");
  });

  router.get("/login", (req, res) => {
    return res.render("login");
  });

  module.exports = router;