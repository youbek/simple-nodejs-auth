import express from "express";

import { UserModel } from "../models";
import { passport, bcrypt } from "../modules";
import { requireAuth, requireNotAuth } from "../middlewares";

export const authRouter = express.Router();

authRouter.get("/logout", requireAuth, (req, res) => {
  req.logOut();

  res.redirect("/");
});

authRouter.get("/register", requireNotAuth, (req, res) => {
  res.render("register", {
    message: req.flash(),
  });
});

authRouter.get("/signin", requireNotAuth, (req, res) => {
  res.render("signin", {
    message: req.flash(),
  });
});

authRouter.post(
  "/signin",
  requireNotAuth,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);

authRouter.post("/register", requireNotAuth, async (req, res) => {
  const formData = req.body;

  const foundUser = await UserModel.findOne({
    email: formData.email.toLowerCase(),
  });

  if (foundUser) {
    req.flash("error", `Email is already in use!`);
    res.redirect("/register");
    return;
  }

  const newUser = new UserModel({
    ...formData,
    email: formData.email.toLowerCase(),
    password: await bcrypt.hashPassword(formData.password),
  });

  await newUser.save();

  req.logIn(newUser, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.redirect("/");
    return;
  });
});
